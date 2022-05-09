import { useCallback , useReducer} from 'react';

const formReduce = (state,action) => {
    switch(action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(const inputId in state.inputs){
                if(!state.inputs[inputId]) continue;
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid;
                }else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            // console.log(formIsValid+' ');
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };
        case 'SET_DATA':
            return {
                inputs : action.inputs,
                isValid :action.formIsValid
            }

        default:
            return state;
    }
}

export const useForm = (intialFormInputs,intialFormValidity) => {
    const [formState, dispatch] = useReducer(formReduce,{
        inputs: intialFormInputs,
        isValid : intialFormValidity //all over form state
    }); 
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type:'INPUT_CHANGE',
            value : value,
            isValid: isValid,
            inputId : id,
        })
    }, [dispatch]);

    const setFormData = useCallback((inputData, fromValidity) => {
        dispatch({
            type :'SET_DATA',
            inputs :inputData,
            formIsValid :fromValidity
        })
    }, []);

    return [formState,inputHandler,setFormData];
}