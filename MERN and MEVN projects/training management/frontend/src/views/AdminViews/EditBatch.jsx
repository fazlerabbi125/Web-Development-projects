import React from 'react'
import Layout from '../../components/common/Layout'
import { axInstance } from '../../hooks/useAxios';
import { getTokens } from "../../utils/handleStorage";
import { useNavigate, useLocation } from "react-router-dom";
import MessageContext from "../../contexts/MessageContext";
import BatchForm from '../../components/forms/BatchForm';

function EditBatch() {
    const navigate = useNavigate(); //hook for re-direct
    const { setMessage } = React.useContext(MessageContext);
    const [error, setError] = React.useState(null);
    const { state: { batch } } = useLocation();
    function handleEdit(inputs) {
        axInstance.patch(`/admin/${batch._id}/edit-batch`, inputs, {
            headers: {
                'Authorization': `Bearer ${getTokens().accessToken}`,
            }
        }).then(function (response) {
            if (!response.data || !response.data.success) {
                console.log(response.response.data.errors);
                throw new Error(response.response.data.message);
            }
            setMessage("Your batch has been edited");
            navigate('/user/batch-list');
        })
            .catch(function (error) {
                setError(error.message);
            });
    }
    return (
        <Layout>
            {error && <h2 className="text-center text-danger">{error}</h2>}
            <BatchForm batch={batch} submitForm={handleEdit} mode="edit" />
        </Layout>
    );
}

export default EditBatch

