export type MinoProps = {
    size:number,
    color: string,
    backColor: string,
    }
    
    export const Mino = (props: MinoProps) => {
    return (
      <div
        style={{
          height: props.size,
          width: props.size,
          backgroundColor: props.color,
          boxShadow: `inset 4px 4px, inset -10% -2%`
        }}
      >


      </div>
    );
    }