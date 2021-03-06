import React from "react";

class AnimalCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newAnimal: {
        commonName: "",
        scientificName: "",
        family: "",
        imageURL: "",
      },
      inputError: {
        commonName: true,
        scientificName: true,
        family: true,
        imageURL: true,
      },
      errActive: false,
      validURL: null,
      otherInputs: false,
    };
    this.inputChange = this.inputChange.bind(this);
    this.validations = this.validations.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.postAnimal = this.postAnimal.bind(this);
  }

  validations() {
    const animal = this.state.newAnimal;
    let newErrState = {
      commonName: true,
      scientificName: true,
      family: true,
      imageURL: true,
    };

    if (animal.commonName.length === 0) newErrState["commonName"] = false;
    if (animal.scientificName.length === 0)
      newErrState["scientificName"] = false;
    if (animal.family.length === 0) newErrState["family"] = false;
    if (animal.imageURL.length === 0) newErrState["imageURL"] = false;

    let errorPresent = Object.values(newErrState).includes(false);

    if (errorPresent) {
      return false;
    } else {
      return true;
    }
  }

  onFormSubmit(e) {
    e.preventDefault();

    this.setState({ errActive: true });

    if (this.validations() === true) {
      this.postAnimal();
    }
  }

  async postAnimal() {
    let newAS = this.state.newAnimal;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();

    urlencoded.append("commonName", `${newAS.commonName}`);
    urlencoded.append("scientificName", `${newAS.scientificName}`);
    urlencoded.append("family", `${newAS.family}`);
    urlencoded.append("imageURL", `${newAS.imageURL}`);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    const retValData = await fetch(
      "https://animalrestapi.azurewebsites.net/Animal/Create?candidateID=cc716bca-578b-4ea3-935b-4cabac7f9696",
      requestOptions
    );
    const theRetStatus = await retValData.json();

    this.setState({
      newAnimal: {
        commonName: "",
        scientificName: "",
        family: "",
        imageURL: "",
      },
    });

    this.props.loadAnimalList();
    this.setState({ errActive: false });
  }

  inputChange(field) {
    // if(field === 'imageURL'){
    //     this.setState({validURL: true})
    // }

    let prevState = this.state.newAnimal;
    return (e) => {
      prevState[field] = e.currentTarget.value;
      this.setState({ newAnimal: prevState });
    };
  }

  render() {
    // let validations = {
    //     comNam: this.state.newAnimal.commonName.length !== 0,
    //     sciNam: this.state.newAnimal.scientificName.length !== 0,
    //     fam: this.state.newAnimal.family.length !== 0,
    //     url: this.state.newAnimal.imageURL.length !== 0
    // }

    // let errActive = this.state.errActive

    return (
      <div className="create-div-main">
        <form className="main-create-div" onSubmit={this.onFormSubmit}>
          {this.state.errActive &&
          this.state.newAnimal.commonName.length === 0 ? (
            <div className="input-create">
              <input
                className="input-red"
                id="common-name"
                value={this.state.newAnimal.commonName}
                placeholder="Common Name"
                type="text"
                onChange={this.inputChange("commonName")}
              />
              <label className="label-red" htmlFor="common-name">
                Enter a name
              </label>
            </div>
          ) : (
            <div className="input-create">
              <input
                className="input-normal"
                id="common-name"
                value={this.state.newAnimal.commonName}
                placeholder="Common Name"
                type="text"
                onChange={this.inputChange("commonName")}
              />
              <label htmlFor="common-name">Animal's common name</label>
            </div>
          )}

          {this.state.errActive &&
          this.state.newAnimal.scientificName.length === 0 ? (
            <div className="input-create">
              <input
                className="input-red"
                id="common-name"
                value={this.state.newAnimal.scientificName}
                placeholder="Scientific Name"
                type="text"
                onChange={this.inputChange("scientificName")}
              />
              <label className="label-red" htmlFor="common-name">
                Enter scientific name
              </label>
            </div>
          ) : (
            <div className="input-create">
              <input
                className="input-normal"
                id="common-name"
                value={this.state.newAnimal.scientificName}
                placeholder="Scientific Name"
                type="text"
                onChange={this.inputChange("scientificName")}
              />
              <label htmlFor="common-name">Animal's scientific name</label>
            </div>
          )}

          {this.state.errActive && this.state.newAnimal.family.length === 0 ? (
            <div className="input-create">
              <input
                className="input-red"
                id="common-name"
                value={this.state.newAnimal.family}
                placeholder="Family"
                type="text"
                onChange={this.inputChange("family")}
              />
              <label className="label-red" htmlFor="common-name">
                Enter family
              </label>
            </div>
          ) : (
            <div className="input-create">
              <input
                className="input-normal"
                id="common-name"
                value={this.state.newAnimal.family}
                placeholder="Family"
                type="text"
                onChange={this.inputChange("family")}
              />
              <label htmlFor="common-name">Animal's family</label>
            </div>
          )}

          {this.state.errActive &&
          this.state.newAnimal.imageURL.length === 0 &&
          !this.state.validURL ? (
            <div className="input-create">
              <input
                className="input-red"
                id="common-name"
                value={this.state.newAnimal.imageURL}
                placeholder="Image URL"
                type="text"
                onChange={this.inputChange("imageURL")}
              />
              <label className="label-red" htmlFor="common-name">
                Enter valid image URL
              </label>
            </div>
          ) : (
            <div className="input-create">
              <input
                className="input-normal"
                id="common-name"
                value={this.state.newAnimal.imageURL}
                placeholder="Image URL"
                type="text"
                onChange={this.inputChange("imageURL")}
              />
              <label htmlFor="common-name">Animal's image URL</label>
            </div>
          )}

          <button className="button-create-animal" type="submit">
            Add new animal
          </button>
        </form>
      </div>
    );
  }
}

export default AnimalCreate;
