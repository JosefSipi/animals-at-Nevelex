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
            },
            inputError: {
                commonName: '',
                scientificName: '',
                family: '',
                imageURL: ''
            }
        }
        this.inputChange = this.inputChange.bind(this)
        this.validations = this.validations.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.postAnimal = this.postAnimal.bind(this)
    }


    validations(){
        const animal = this.state.newAnimal
        let newErrState = {...this.state.inputError};

        if(animal.commonName.length === 0) newErrState['commonName'] = false
        if(animal.scientificName.length === 0) newErrState['scientificName'] = false
        if(animal.family.length === 0) newErrState['family'] = false
        if(animal.imageURL.length === 0) newErrState['imageURL'] = false

        let exists = Object.values(newErrState).includes(false);

        if(exists){
            this.setState({inputError: newErrState})
            return
        } else {
            this.postAnimal()
            debugger
            this.props.loadAnimalList()
            debugger
        }
        
    }

    onFormSubmit(e){
        e.preventDefault();
        this.validations()
    }

    async postAnimal(){

        let newAS = this.state.newAnimal

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();

        urlencoded.append("commonName", `${newAS.commonName}`);
        urlencoded.append("scientificName", `${newAS.scientificName}`);
        urlencoded.append("family", `${newAS.family}`);
        urlencoded.append("imageURL", `${newAS.imageURL}`);
        
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded
        };

        const retValData = await fetch("https://animalrestapi.azurewebsites.net/Animal/Create?candidateID=cc716bca-578b-4ea3-935b-4cabac7f9696", requestOptions)
        const theRetStatus = await retValData.json();

        this.setState({
            newAnimal: {
                commonName: '',
                scientificName: '',
                family: '',
                imageURL: ''
            },
            inputError: {
                commonName: '',
                scientificName: '',
                family: '',
                imageURL: ''
            }
        })

    }

    inputChange(field){
        let prevState = this.state.newAnimal
        return(e) => {
            prevState[field] = e.currentTarget.value
            this.setState({newAnimal: prevState})
        }
    }

    render(){
        
        return(
            <div>
                <form className="main-create-div" onSubmit={this.onFormSubmit} >

                    <input value={this.state.newAnimal.commonName} placeholder="Common Name" type="text" onChange={this.inputChange('commonName')} />
                    <input value={this.state.newAnimal.scientificName} placeholder="Scientific Name" type="text" onChange={this.inputChange('scientificName')} />
                    <input value={this.state.newAnimal.family} placeholder="Family" type="text" onChange={this.inputChange('family')} />
                    <input value={this.state.newAnimal.imageURL} placeholder="Photo URL" type="text" onChange={this.inputChange('imageURL')} />

                    <button type="submit">Post Animal</button>
                    
                </form>
            </div>
        )
    }
}

export default AnimalCreate