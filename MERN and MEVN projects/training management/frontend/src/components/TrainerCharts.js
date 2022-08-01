import React from 'react'
import {useAxios} from '../hooks/useAxios'
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ChartDataLabels,
    Title,
    Tooltip,
    Legend
);


function TrainerCharts(props) {
    
    const {data, error, isLoading}=useAxios(`/trainer/${props.evaluation}/get-assessment`,0);
    const options = {
        indexAxis: 'y', //to get horizontal bar chart
        responsive: true,
        maintainAspectRatio:false,
        elements: {
            bar: {
            borderWidth: 2,
            },
        },
        plugins: { // plugin package for data labels
            datalabels: {
            display: true,
            color: "black",
            align: "center",
            weight: "bold",
            font: {
                size: 14
            }
        },
            legend: {
            labels: {
                color: "black",
            }
            }
        },
        scales: {
            y:{
                ticks:{
                    color: 'black',
                    fontSize: 12,
                }
            },
            x: {
                suggestedMax: data?.total||0,
                suggestedMin: 0,
                ticks:{
                    color: 'black',
                    fontSize: 12,
                }
            },
        },
    };
    function getScores(){
        const scores=data?.assessment.batch.trainees.map((item)=>{
            const trainee=data?.assessment.traineeScores.find((elem)=>item._id===elem.trainee)
            return trainee?.score
        })
        return scores
    }
    const labels=data?.assessment.batch.trainees.map((item)=>item?.name)||[];
    const scores=getScores();
    console.log(labels);
    const evalInfo={
        labels,
        datasets: [
            {
            label: 'Trainee scores of '+data?.assessment.title,
            data:scores,
            borderColor: 'rgb(170, 130, 230)',
            backgroundColor: 'rgba(170, 130, 230, 0.6)',
        }],
    }

    return (
    <section className="w-75 mx-auto mb-5">
        {error && <h2 className="text-center text-danger">{error}</h2>}
        {!isLoading && data?.assessment && (
        <Bar options={options} data={evalInfo} width={400} height={500} />
        )}
    </section>
    )
}

export default TrainerCharts