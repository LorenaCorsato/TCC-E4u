 import '../styles/components/aluno.css'
 
 export default function Aluno( {srcAluno, altAluno, nome, funcao} ){
    return(
        <>
            <div className="aluno">
                <div>
                    <img className="fotoAluno" src={srcAluno} alt={altAluno} />
                </div>

                <div className="nomeAluno">
                    <p>{nome}</p>
                </div>

                <div className="funcaoAluno">
                    <p>{funcao}</p>
                </div>
            </div>
        </>
    )
 }