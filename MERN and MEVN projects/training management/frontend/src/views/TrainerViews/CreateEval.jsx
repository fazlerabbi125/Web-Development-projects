import React from 'react'
import { axInstance } from '../../hooks/useAxios';
import { getTokens } from "../../utils/handleStorage";
import { useNavigate, useParams } from "react-router-dom";
import MessageContext from "../../contexts/MessageContext";
import EvalForm from '../../components/forms/EvalForm';
import Layout from '../../components/common/Layout';

function CreateEval() {
    const navigate = useNavigate(); //hook for re-direct
    const { setMessage } = React.useContext(MessageContext);
    const [error, setError] = React.useState(null);
    const { batchID, courseID } = useParams();
    function handleAdd(inputs) {
        axInstance.post(`/trainer/${batchID}/${courseID}/add-assessment`, inputs, {
            headers: {
                'Authorization': `Bearer ${getTokens().accessToken}`
            }
        })
            .then(function (response) {
                if (!response.data || !response.data.success) {
                    console.log(response.response.data.errors);
                    throw new Error(response.response.data.message);
                }
                setMessage("Your assessment has been added");
                navigate(`/trainer/${batchID}/${courseID}/assessment-list`);
            })
            .catch(function (error) {
                setError(error.message);
            });
    }
    return (
        <Layout>
            {error && <h2 className="text-center text-danger">{error}</h2>}
            <EvalForm assessment={{}} submitForm={handleAdd} />
        </Layout>
    );
}

export default CreateEval;