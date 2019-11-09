import React, {useRef,useEffect,useState,useCallback, EffectCallback} from "react";
import e from "express";

const Canvas: React.FC = () => {
    const canvasRef = useRef(null);

    const [drawing,setDrawing]=useState<boolean>(false);
    const [coodinatesx,setCoodinateX]=useState<number>(0);
    const [coodinatesy,setCoodinateY]=useState<number>(0);

    const getContext = (): CanvasRenderingContext2D => {
      const canvas: any = canvasRef.current;
      return canvas.getContext('2d');
    };

    const getCoodinate=(x:number,y:number)=>{
      setCoodinateX(x);
      setCoodinateY(y);
    };

    const startDraw = (x:number,y:number)=>{ 
      setDrawing(true);
      const ctx:CanvasRenderingContext2D=getContext();
      ctx.moveTo(x,y);
    };

    const mouseMove = (x:number,y:number)=>{
      if(drawing){
        getCoodinate(x,y);
      }
    };

    useEffect(()=>{
      const ctx:CanvasRenderingContext2D=getContext();
      ctx.strokeStyle="white";
      ctx.lineTo(coodinatesx,coodinatesy);
      ctx.stroke();
    },[coodinatesx,coodinatesy])
    
    const endDraw=()=>{
      setDrawing(false);
    };

    return (
      <div>
        <canvas className="canvas"
         ref={canvasRef} 
         width="400px"
         height="400px"
         onMouseDown={e=>startDraw(e.nativeEvent.offsetX,e.nativeEvent.y)}
         onMouseMove={e=>mouseMove(e.nativeEvent.offsetX,e.nativeEvent.y)}
         onMouseUp={endDraw}
         onMouseLeave={endDraw}
         />
      </div>
    );
};

export default Canvas;