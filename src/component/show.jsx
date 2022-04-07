import React from "react";

class AnimalShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            animal_id: props.id
        }
    }



    componentDidMount(){
        
    }

    render(){
        return(
            <div>This is show component</div>
        )
    }

}

export default AnimalShow