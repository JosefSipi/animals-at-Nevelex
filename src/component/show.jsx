import React from "react";
import errorImg from '../../src/error.png';

class AnimalShow extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            animal_id: props.id,
            animal: null,
            confirmDelet: false
        }
        this.fetchEntry = this.fetchEntry.bind(this)
        this.deleteClicked = this.deleteClicked.bind(this)
        this.defaultImg = this.defaultImg.bind(this)
    }

    defaultImg(e){
        debugger
        e.target.src = errorImg
    }

    async deleteClicked(){
        debugger
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
        };

        const retStatus = await fetch(`https://animalrestapi.azurewebsites.net/Animal/Delete/?candidateID=cc716bca-578b-4ea3-935b-4cabac7f9696&id=${this.state.animal_id}`, requestOptions)
        const status = await retStatus.json()
        console.log(status)

        this.props.loadAnimalList()
        this.props.closeModal()
        

    }


    componentDidMount(){
        this.fetchEntry(this.state.animal_id)
    }

    async fetchEntry(id){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        }

        const retValData = await fetch(`https://animalrestapi.azurewebsites.net/Animal/Id?candidateID=cc716bca-578b-4ea3-935b-4cabac7f9696&id=${id}`, requestOptions)
        const theAnimal = await retValData.json()
        this.setState({animal: theAnimal.animal})
        
    }

    render(){
        if(!this.state.animal) return null
        
        return(
            <div className="modal-div-main">
                <div className="img-div-on-modal">
                    <img onError={this.defaultImg} className='animal_img_show_modal' src={this.state.animal.imageURL} alt='animal img' />
                </div>
                
                <div className="show-modal-txt">
                    <div>Animal ID: {this.state.animal.id}</div>
                    <div>Common name: {this.state.animal.commonName}</div>
                    <div>Animal scientific name: {this.state.animal.scientificName}</div>
                    <div>Family name: {this.state.animal.family}</div>
                    <button className='delete-btn-primary' onClick={() => this.setState({confirmDelet: true})}> Delete Animal </button>
                </div>

                {this.state.confirmDelet 
                ? 
                <div className="parent-delet">
                    <div className="delete-confirm">
                        <div className="delete-msg">Are you sure you don't want this animal anymore!?</div>

                        <div className="delete-buttons">
                            <button onClick={this.deleteClicked}>Delete</button>
                            <button onClick={() => this.setState({confirmDelet: false})}>Cancel</button>
                        </div>
                    </div>
                </div>
                :   
                    null
                } 
            </div>
        )

    }

}

export default AnimalShow