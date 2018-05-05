import express from 'express';
import path from 'path';
import compression from 'compression';
import db from './db';

const PORT = 3000;
const app = express();

app.use(compression());

app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/subjectsinfo', (req, res) => {    
    db.query('SELECT * FROM gaze_monitoring.subject_info', [], (err, response) => {
        if(err){
            res.status(500).send({ error: 'Encountered not recoverable error.' });
        } else {
            res.status(200).send({subjectInfo: response.rows});
        }
    });
});

app.get('/subjectsinfo/:id/gazepoints', (req, res)=>{
    const id = req.params.id;
    console.log(`request ID: ${id}`);
    db.query(`SELECT x, y, subject_info_id
	FROM gaze_monitoring.gaze_point
    WHERE subject_info_id=$1`, [id], (err, response)=>{
        if(err){
            res.status(500).send({ error: 'Encountered not recoverable error.' });
        } else {
            res.status(200).send({gazepoints: response.rows});
        }
    });

});

app.get('/subjectsinfo/:id/saccades', (req, res)=>{
    const id = req.params.id;
    db.query(`SELECT direction, amplitude, velocity, start_timestamp, subject_info_id
	FROM gaze_monitoring.saccade
    WHERE subject_info_id=$1;`, [id], (err, response)=>{
        if(err){
            res.status(500).send({ error: 'Encountered not recoverable error.' });
        } else {
            res.status(200).send({seccades: response.rows});
        }
    });

})

app.listen(PORT, () => console.log(`Gaze Monitoring running on PORT: ${PORT}`));