import React from 'react'
import { useSelector} from 'react-redux'
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

const options = {
    responsive: true,
    maintainAspectRatio:false,
    elements: {
        bar: {
        borderWidth: 2,
        },
    },
    plugins: {
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
            suggestedMin: 0,
            ticks:{
                color: 'black',
                fontSize: 12,
            }
        },
        x: {
            ticks:{
                color: 'black',
                fontSize: 12,
            }
        },
    },
};
function TraineeEvalChart({assessmentList}) {
    const auth= useSelector((state) => state.authUser.userData);
    
    function getScores(evaluation){
        const trainee=evaluation.traineeScores.find((elem)=>{
        console.log(elem);
        return auth._id===elem.trainee
    })
        return trainee?.score
    }
    const labels=assessmentList?.map((item)=>item.title)||[];
    const scores=assessmentList.map(getScores);
    const evalInfo={
        labels,
        datasets: [
            {
            label: `Assessment scores of ${assessmentList[0].course.title} course in ${assessmentList[0].batch.name}`,
            data:scores,
            borderColor: 'rgb(170, 130, 230)',
            backgroundColor: 'rgba(170, 130, 230, 0.6)',
        }],
    }

    return (
    <section className="w-75 mx-auto mb-5">
        <Bar options={options} data={evalInfo} width={400} height={500} />
    </section>
  )
}

export default TraineeEvalChart