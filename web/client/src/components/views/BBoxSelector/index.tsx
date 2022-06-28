import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './TouchTargets.module.css'
const useStyles = createUseStyles({
    bboxSelector: { //바운딩 박스 레이블링 스타일
        border: (props: Props) => `${props.borderWidth || 2}px dotted rgb(127,255,127)`, 
        borderWidth: (props: Props) => `${props.borderWidth || 2}px`,
        position: 'absolute',
    },
});

interface Props { // 변수들 타입 선언
    rectangle: { x: number; y: number; width: number; height: number }; // 박스
    // bboAnnotator 에서 받온 것을 사용하기 위함.
    borderWidth?: number; // 박스 두께
    mouseDownHandler : any;

}

const BBoxSelector: React.FC<Props> = ({ rectangle, borderWidth = 2 , mouseDownHandler}) => {
    const classes = useStyles ({ rectangle, borderWidth, mouseDownHandler }); // 바운딩 박스 스타일

    return (
        <>
        <div
            className={classes.bboxSelector}
            style={{
                top: `${rectangle.y - borderWidth }px`,
                left: `${rectangle.x - borderWidth}px`,
                width: `${rectangle.width}px`,
                height: `${rectangle.height}px`,
            }}
        >
       
        </div>
        </>
    );
};

export default BBoxSelector;