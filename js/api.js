// TODO: API 분리 후 수정하기



export const getQuestions = async () =>{
    const response = await fetch('/assets/QuestionResponse.json')

    if(!response.ok){
        throw new Error('http error')
    }
    
    return response.json()
}

export const getResults = async () => {
    const response = await fetch('/assets/ResultResponse.json')

    if(!response.ok){
        throw new Error('http error')        
    }

    return response.json()
}