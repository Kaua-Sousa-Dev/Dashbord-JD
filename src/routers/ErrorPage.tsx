// importando arquivos
import error404 from "/Error404.jpg"
import "../css/error404.css"

// Rota Error404
const ErrorPage = () =>{
    return(
    <div>
        <img src={error404} alt="Error404" className="error404"/>
    </div>
    )
}

export default ErrorPage;