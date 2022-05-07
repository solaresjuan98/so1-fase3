import axios from 'axios';
import React, { useState } from 'react'


export const useForm = <T>(initialState: T) => {

    const [formData, setFormData] = useState<T>(initialState);


    const onChangeForm = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = ev.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }



    const isNotEmpty = (field: string): boolean => {

        return (field.trim().length > 0) ? true : false;
    }


    return {
        onChangeForm,
        isNotEmpty,
        formData
    }


}
