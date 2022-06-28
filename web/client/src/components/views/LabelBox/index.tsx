
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    // Annotatator에서 계산된 top, left값을 받아 
    // 라벨 박스 그 위치에 맞게 고정 & 레이블링
    labelBox: { 
        left: (props: Props) => `${props.x}px`, 
        top: (props: Props) => `${props.y}px`,
        position: 'absolute',
    },
    labelInput: {},
});

interface Props {
    x: number;
    y: number;
    inputMethod?: String ;
    labels?:  string | string[];
    onSubmit: (label: string) => void;
    setlabels?: any;
    setaddlabel? : any;
}

const LabelBox = React.forwardRef<any, Props>(({ inputMethod, ...props }, forwardedRef) => {
    const classes = useStyles(props); // left, top
    const [value, setValue] = useState(''); 
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        // 이벤트 타입 지정
        setValue(e.target.value); // 값
        console.log(e.target.value);
        if (inputMethod === 'select') {
            props.onSubmit(e.target.value);
        }
        else if (inputMethod === 'text') {
           // props.setlabels(props.labels?.concat(e.target.value));
        }
    };
    const keyPressHandler = (e: React.KeyboardEvent) => { //text 
        if (e.which === 13) { // enter
            props.onSubmit(value);
            if(!labels.includes(value)){
                props.setlabels(props.labels?.concat(value));
            }
          
            
//            props.setaddlabel(props.labels?.concat(value));

        }
        return e.which !== 13;
    };

    let { labels = ['object'] } = props;

    if (typeof labels === 'string') {
        labels = [labels];
    }
    let labelInput;

    switch (inputMethod) {
        case 'select':
            labelInput = (
                <select
                    className={classes.labelInput}
                    name="label"
                    ref={forwardedRef}
                    onChange={changeHandler}
                    onMouseDown={(e) => e.stopPropagation()}
                    // 부모 엘리먼트에서도 같은 이벤트를 사용 중
                    // 전파를 방지하기 위해 stopPropagation 사용
                >
                    <option>choose an item</option>
              
                    {labels.map((label) => (
                        <option key={label} value={label}>
                            {label}
                        </option>
                    ))}
                </select>
            );
            break;
        case 'text':
            labelInput = (
                <input
                    className={classes.labelInput}
                    name="label"
                    type="text"
                    value={value}
                    ref={forwardedRef}
                    onKeyPress={keyPressHandler}
                    onChange={changeHandler}
                    onMouseDown={(e) => e.stopPropagation()}
                />   
            );
            break;
        default:
            throw `Invalid labelInput parameter: ${inputMethod}`;
    }
    return <div className={classes.labelBox}>{labelInput}</div>;
});
LabelBox.displayName = 'LabelBox';

export default LabelBox;