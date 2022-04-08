import React from "react";

class AnimalCreate extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            newAnimal: {
                commonName: '',
                scientificName: '',
                family: '',
                imageURL: ''
            }
        }
        this.createAnimal = this.createAnimal.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.validations = this.validations.bind(this)
    }

    validations(){

    }

    onFormSubmit(){
        this.validations()
    }

    inputChange(field){
        let prevState = this.state.newAnimal
        return(e) => {
            prevState[field] = e.currentTarget.value
            this.setState({newAnimal: prevState})
        }
    }

    createAnimal(){

    }

    render(){
        debugger
        return(
            <form className="main-create-div" onSubmit={this.onFormSubmit} >

                <input placeholder="Common Name" type="text" onChange={this.inputChange('commonName')} />
                <input placeholder="Scientific Name" type="text" onChange={this.inputChange('scientificName')} />
                <input placeholder="Family" type="text" onChange={this.inputChange('family')} />
                <input placeholder="Photo URL" type="text" onChange={this.inputChange('photoURL')} />
                
            </form>
        )
    }
}

export default AnimalCreate