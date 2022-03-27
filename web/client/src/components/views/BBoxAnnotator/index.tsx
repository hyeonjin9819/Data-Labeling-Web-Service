import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { CloseButton } from 'react-bootstrap';
import { createUseStyles } from 'react-jss';
import { v4 as uuid } from 'uuid';
import BBoxSelector from '../BBoxSelector';
import LabelBox from '../LabelBox';
import Polygon from '../Polygon/Polygon';
import draw from '../images/draw.png';
import save from '../images/save.png';

export type EntryType = { // 라벨링 시 출력되는 데이터를 담는 곳 
    x: number; //left
    y: number; // top
    width: number;
    height: number;
    label: string;
  //  x:number;
  //  y:number;
    index : any;
};

const useStyles = createUseStyles({ // react-jss 사용
    bBoxAnnotator: {
        cursor: 'crosshair', 
        // 사진에 마우스를 두게 되면 십자선 커서로 바뀜
    },
    imageFrame: { // 사진 기본 스타일
        position: 'relative',
        backgroundSize: '100%',
    },
});
type Props = { // 타입 정의
    url: string; // 사진 경로 
    inputMethod: String  ; // 레이블링 이름 메소드 선택 
    labels?: string[]  ; // 라벨 이름 타입
    onChange: (entries: EntryType[]) => void; // left, top, width, height, label 값을 가진 EntryType
    borderWidth?: number; // 바운딩 박스 테두리 두께
    setlabels?:any ;
    
};

const BBoxAnnotator = React.forwardRef<any, Props>(({ url, borderWidth = 2,inputMethod, labels, onChange , setlabels}, ref) => {
    const [multiplier, setMultiplier] = useState(1);
    const [user_Width, setuser_Width] = useState<any>(window.innerWidth);
    const [user_Heigth, setuser_Height] = useState<any>(window.innerHeight);
    const bBoxAnnotatorRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const labelInputRef = useRef<HTMLDivElement>(null);
    const maxHeigth = inputRef.current?.clientHeight || 1;
    // React.forwardRef : 부모 컴포넌트로부터 하위 컴포넌트로 ref를 전달할 수 있다.
    // 전달받은 ref를 html 요소의 속성으로 넘겨줌으로써 함수 컴포넌트 역시 ref를 통한 제어가 가능해진다.
    window.onresize = function(event){
        setuser_Width(window.innerWidth);
        setuser_Height(window.innerHeight);
        console.log('screen_a', inputRef.current);
        console.log('screen_Wi', window.innerWidth);
        console.log('screen_Hi', window.innerHeight);
      }
      const [labelTool, setlabelTool] = useState<any>(inputMethod);
      console.log('change', labelTool)
      let [tool, settool] = useState('bbox');

      const changeOn = (to : String) => {
        setlabelTool(to);
      }
      const changetool = (to : string) => {
        settool(to);
      }
 
    const classes = useStyles();
    const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
    const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);
    const [showCloseButton, setshowCloseButton] = useState<boolean>();

    const [entries, setEntries] = useState<
        ({
            id: string;
            showCloseButton: boolean;
           
        } & EntryType)[]
    >([]);
    // const [multiplier, setMultiplier] = useState(1);
    // const [user_Width, setuser_Width] = useState<any>(window.innerWidth);
    // const [user_Heigth, setuser_Height] = useState<any>(window.innerHeight);
    useEffect(() => { // 리렌더링 될 때 마다 실행 
       // setuser_Width(window.innerWidth);
       
        onChange(
            entries.map((entry) => ({
                index : labels?.indexOf(entry.label),    
                label: entry.label,
                width: Math.round(entry.width * multiplier),
                height: Math.round(entry.height * multiplier),
                x: Math.round(entry.x * multiplier) + Math.round(entry.width * multiplier)/2 ,
                y: Math.round(entry.y * multiplier) + Math.round(entry.height * multiplier)/2 ,
              //  top: Math.round(entry.top * multiplier)  ,
              //  left: Math.round(entry.left * multiplier) ,
                // 바운딩 박스 시 수치와 라벨 
            })),
        );
    }, [entries, multiplier]); // 바뀌는 값
    const [status, setStatus] = useState<'free' | 'input' | 'hold'>('free');
    const [bBoxAnnotatorStyle, setBboxAnnotatorStyle] = useState<{ width?: number; height?: number }>({});
    const [imageFrameStyle, setImageFrameStyle] = useState<{
        width?: number;
        height?: number;
        backgroundImageSrc?: string;
    }>({}); // 업로드 이미지 스타일

    // const bBoxAnnotatorRef = useRef<HTMLDivElement>(null);
    // const inputRef = useRef<HTMLDivElement>(null);
    // const labelInputRef = useRef<HTMLDivElement>(null);
    // const maxHeigth = inputRef.current?.clientHeight || 1;
    useEffect(() => { // 재런더링
       const maxWidth = bBoxAnnotatorRef.current?.offsetWidth || 1;
       
        console.log('maxWidth', maxWidth); // canvas
        // react 요소의 너비를 얻는다
        console.log('maxHeight', maxHeigth); // 레이블 도구 높이

        //
       // setuser_Width(window.innerWidth);
        const imageElement = new Image(); // Image 객체 생성
        imageElement.src = url;
        imageElement.onload = function () {
            const width = imageElement.width;
            const height = imageElement.height;
            console.log('img size', width, height) // 실제 이미지 사이즈
            console.log('multipliter', multiplier);
            setMultiplier(width / maxWidth);
            setBboxAnnotatorStyle({
                width: width / multiplier,
                height: height / multiplier,
            });

            setImageFrameStyle({
                backgroundImageSrc: imageElement.src,
                width: width / multiplier,
                height: height / multiplier,
            });
        };
        imageElement.onerror = function () {
            throw 'Invalid image URL: ' + url;
        };
    }, [url, multiplier, bBoxAnnotatorRef]);

    const crop = (pageX: number, pageY: number) => {
     console.log('current_offsetLeft', bBoxAnnotatorRef.current?.offsetLeft); // 이미지 가로 세로
     console.log('current_offsetTop ', bBoxAnnotatorRef.current?.offsetTop);
        return {
            x:
                bBoxAnnotatorRef.current && imageFrameStyle.width
                    ? Math.min( 
                        Math.max(Math.round(pageX - bBoxAnnotatorRef.current.offsetLeft), 0),
                      //  Math.max(Math.round(pageX - ( user_Width - bBoxAnnotatorRef.current.clientWidth )/2 - 2) , 0),
                        Math.round(imageFrameStyle.width ),  
                      )                     
                    : 0,
            y:
                bBoxAnnotatorRef.current && imageFrameStyle.height
                    ? Math.min(
                        Math.max(Math.round(pageY - bBoxAnnotatorRef.current.offsetTop ), 0),
                         // Math.max(Math.round(pageY - ( user_Heigth - (bBoxAnnotatorRef.current.clientHeight + maxHeigth)  )/2), 0),
                          Math.round(imageFrameStyle.height ),
                      )
                    : 0,
        };
    };
    const updateRectangle = (pageX: number, pageY: number) => {
        setPointer(crop(pageX, pageY));
    };

// useEffect(
//      () => {setuser_Width(window.innerWidth);
//     }    
// ,[Window])

// 컴포넌트가 처음 나타날때, 사라질때, 업데이트 될 때 특정 작업을 처리
    useEffect(() => {
        const mouseMoveHandler = (e: MouseEvent) => {
            switch (status) {
                case 'hold':
                    updateRectangle(e.pageX, e.pageY);
                    console.log('MouseMove', e.pageX, e.pageY);
                    console.log('window',window.innerWidth);
                   // setuser_Width(window.innerWidth);
            }
        };
        window.addEventListener('mousemove', mouseMoveHandler);
        setuser_Width(window.innerWidth);
        return () => window.removeEventListener('mousemove', mouseMoveHandler);
    },[status]);
 // mousemove -> 마우스가 움직일 때 마다 발생 , 마우스 커서의 현재 위치를 계속 기록

    useEffect(() => {
        const mouseUpHandler = (e: MouseEvent) => {
            switch (status) {
                case 'hold':
                    updateRectangle(e.pageX, e.pageY); // 움직이는 좌표 ..? 그래서 결과적으론 마지막 좌표
                    console.log('mouseUP', e.pageX, e.pageY);
                    setStatus('input');
                    labelInputRef.current?.focus();
            }
        };
        window.addEventListener('mouseup', mouseUpHandler);
        // mouseup -> 마우스를 떼는 그 순간 드래그한 HTML 위에 놓을 수 있다.
       // setuser_Width(window.innerWidth);
        return () => window.removeEventListener('mouseup', mouseUpHandler);
    }, [status, labelInputRef]);

    const addEntry = (label: string) => { // select or text로 들어온 label을 매개인자로 
        setEntries([...entries, { ...rect ,label ,id: uuid(),showCloseButton: false  }]);
        setshowCloseButton(false);
        setStatus('free');
        setPointer(null);
        setOffset(null);
    };

    const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        switch (status) {
            case 'free':
            case 'input':
                if (e.button !== 2) {
                    setOffset(crop(e.nativeEvent.pageX , e.nativeEvent.pageY)); // 처음 클릭한 죄표
                    setPointer(crop(e.nativeEvent.pageX , e.nativeEvent.pageY )); // 처음 클릭한 죄표
                    setStatus('hold');
                    console.log("mouseDown ",e.nativeEvent.pageX , e.nativeEvent.pageY)
                }
        }
    };

    const rectangle = () => {
        const x1 = offset && pointer ? Math.min(offset.x, pointer.x) : 0; // left
        const y1 = offset && pointer ? Math.min(offset.y, pointer.y) : 0; // top
        const x2 = offset && pointer ? Math.max(offset.x, pointer.x) : 0; // 
        const y2 = offset && pointer ? Math.max(offset.y, pointer.y) : 0; // height 
   
        return { 
            width: x2 - x1 + 1,
            height: y2 - y1 + 1,
            x: x1 ,
            y: y1,
            // x: 0, // x 좌표
            // y: 0, // y 좌표
            index : 0
        };
    };

    useImperativeHandle(ref, () => ({
        reset() {
            setEntries([]);
        },
    }));
    const rect = rectangle();

    const a = JSON.stringify(entries);
   
    return (
        <div 
        style = {{
            display: 'flex',
            flexDirection: 'row'
        }}
        >
        <div style={{width : '70%'}}>
        <div
            className={classes.bBoxAnnotator}
            style={{
                width: bBoxAnnotatorStyle.width ,
                height: bBoxAnnotatorStyle.height,
                backgroundColor: 'transparent',
                border: '1px solid red',

              
            }}
            ref={bBoxAnnotatorRef}
            onMouseDown={mouseDownHandler}
        >
      
            <div
                className={classes.imageFrame}
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${imageFrameStyle.backgroundImageSrc})`,
                    backgroundRepeat: 'no-repeat',
                     backgroundPosition: 'center'  ,  
                }}
            >
                {status === 'hold' || status === 'input' ? <BBoxSelector rectangle={rect} /> : null}
                {status === 'input' ? (
                    <LabelBox
                        inputMethod= {labelTool}
                        y={rect.y + rect.height + borderWidth}
                        x={rect.x - borderWidth}
                        labels={labels}
                        onSubmit={addEntry}
                        ref={labelInputRef}
                        setlabels = {setlabels}
                    />
                ) : null}
                
                {entries.map((entry, i) => (
                    <div
                        style={{
                            border: `${borderWidth}px solid rgb(255,0,0)`,
                            position: 'absolute',
                            top: `${entry.y - borderWidth}px`,
                            left: `${entry.x - borderWidth}px`,
                            width: `${entry.width}px`,
                            height: `${entry.height}px`,
                            color: 'rgb(255,0,0)',
                            fontFamily: 'monospace',
                            fontSize: 'small',
                        }}
                        key={i}
                        onMouseOver={() =>
                            setEntries((prevEntries) =>
                            prevEntries.map((e) => (e.id === entry.id ? { ...e, showCloseButton: true } : e)),
                        )
                        }
                        onMouseLeave={() =>
                            setEntries((prevEntries) =>
                            prevEntries.map((e) => (e.id === entry.id ? { ...e, showCloseButton: false } : e)),
                        )
                        }
                    >
                        {entry.showCloseButton ? (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    width: '16px',
                                    height: '0',
                                    padding: '16px 0 0 0',
                                    overflow: 'hidden',
                                    color: '#fff',
                                    backgroundColor: '#030',
                                    border: '2px solid #fff',
                                    borderRadius: '18px',
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    textAlign: 'center',
                                }
                            }
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                }}
                                onClick={() => {
                                    setEntries(entries.filter((e) => e.id !== entry.id));
                                }}
                            >
                                <div
                                    style={{
                                        display: 'block',
                                        textAlign: 'center',
                                        width: '16px',
                                        position: 'absolute',
                                        top: '-2px',
                                        left: '0',
                                        fontSize: '16px',
                                        lineHeight: '16px',
                                        fontFamily:
                                            '"Helvetica Neue", Consolas, Verdana, Tahoma, Calibri, ' +
                                            'Helvetica, Menlo, "Droid Sans", sans-serif',
                                    }}
                                >
                                    &#215;
                                </div>
                            </div>
                        ) : null}
                        <div style={{ overflow: 'hidden' }}>{entry.label}</div>
                        
                    </div>
                ))}
              
             </div>
  </div>
  </div>
  <div className="tool_menuss" 
  style = {{height : '600px'}}
  >

<h3>레이블링 객체3 {console.log("비박스 어노테이터 확인")}</h3>
<ul>
<li value = 'text'><a href = '#' onClick={()=> changeOn('text') }> text </a></li>
<li value = 'select'><a href = '#' onClick={()=> changeOn('select')}> select </a></li>
{/*
<li value = 'bbox'><a href = '#' onClick={()=> changetool('bbox')}> bbox </a></li>
<li value = 'canvas_polygon'><a href = '#' onClick={()=> changeOn('polygon')}> polygon </a></li>
<li value = 'polygon'><a href = '#' onClick={()=> changetool('polygon')}> polygon </a></li>
*/}
</ul>
<br/>

</div>

   <footer>
   </footer>
</div>

         
    );
});
export default BBoxAnnotator;
