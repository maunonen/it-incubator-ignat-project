import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperRadio.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        // onChange, onChangeOption
        const chosenOption = e.target.value
        if (chosenOption) {
            onChangeOption && onChangeOption(chosenOption)
        }
    }

    const mappedOptions: any[] = options ? options.map((o, i) => (
        // map options with key
        <label key={name + '-' + i} className={s.radioInputStyle}>
            <input
                type={'radio'}
                name={'superRadio'}
                value={o}
                onChange={onChangeCallback}
                checked={value === o ? true : false}
            />
            {o}
        </label>
    )) : []

    return (
        <>
            {mappedOptions}
        </>
    )
}

export default SuperRadio
