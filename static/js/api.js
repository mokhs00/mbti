// TODO: API 분리 후 수정하기
const API_END_POINT = "http://localhost/static/assets"


export const getQuestions = async () =>{
    const response = await fetch(`${API_END_POINT}/QuestionResponse.json`)

    if(!response.ok){
        throw new Error('http error')
    }
    
    return response.json()
}

export const getResults = async () => {
    const response = await fetch(`${API_END_POINT}/ResultResponse.json`)

    if(!response.ok){
        throw new Error('http error')        
    }

    return response.json()
} 