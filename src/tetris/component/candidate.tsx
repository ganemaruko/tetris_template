import { EntityBlockName } from "tetris/core/block"

export type CandidateProps = {
    block: EntityBlockName
}

export const Candidate = (props:CandidateProps) => {
    return(
        <div>{props.block}</div>
    )
}