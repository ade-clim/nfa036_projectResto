import React, {useEffect, useState} from 'react';
import axios from 'axios';

const CategoriePage = () => {
    const [categorys, setCategorys] = useState([]);
    useEffect(() => {
        axios
            .get("https://localhost:8000/api/categories")
            .then(response => response.data['hydra:member'])
            .then(data => setCategorys(data))
            .catch(error => console.log(error.response));
    },[])

    const handleDelete = (id)=>{

        const originalCategorys = [...categorys];
        setCategorys(categorys.filter(categorys => categorys.id !== id))

        axios.delete("https://localhost:8000/api/categories/"+ id)
            .catch(error => {
                setCategorys (originalCategorys);
                console.log(error.response);
            });

    }
    return(
        <>
            <h1>Liste des catégories</h1>
            <table className={"table table-hover"}>
                <thead>
                <tr>
                    <th>Id.</th>
                    <th>Title</th>
                </tr>
                </thead>
                <tbody>
                {categorys.map(category => <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.title}</td>
                    <td><button disabled={category.products.length > 0} className={"btn btn-sm btn-danger"} onClick={() => handleDelete(category.id)}>supprimer</button></td>
                </tr>)}
                </tbody>
            </table>
        </>

    )
}

export default CategoriePage;