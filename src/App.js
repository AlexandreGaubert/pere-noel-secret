import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      names: [],
      picked: {}
    }
    // this.input = React.createRef();
    this.submit = this.submit.bind(this);
    this.handleinput = this.handleinput.bind(this);
    document.title = "Tirage du Père Noël"
  }

  componentDidMount() {
    axios.get('/getNames')
      .then(res => {
        this.setState({ names: res.data, name: res.data[0] })
      })
      .catch(err => {
        console.log(err);
      })

      console.log(window.innerWidth);
  }

  submit() {
    axios.post("/pick", {name: this.state.name})
      .then(res => {
        this.setState({picked: res.data})
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleinput(e) {
    this.setState({
      name: e.target.value
    });
  }

  renderForm() {
    return (
      <div style={styles.mainContainer}>
        <div style={styles.container}>
          <h1 style={styles.title}>Choisis ton nom dans la liste et laisse faire la magie :)</h1>
          <select onChange={this.handleinput} value={this.state.name} style={styles.input}>
            {this.state.names.map((name, key) => {
              return <option>{name}</option>
            })}
          </select>
          <span className="button" onClick={this.submit}>LAISSER FAIRE LA MAGIE</span>
          <p style={styles.paragraph}>et ne le dit à personne...</p>
          <img width="100%" style={styles.img} src="santa_chut.jpg"/>
        </div>
      </div>
    )
  }

  renderPicked() {
    const { picked } = this.state;
    return (
      <div style={styles.mainContainer}>
        <div style={styles.container}>
          <h1 style={{textAlign: "center", margin: "0 auto", marginTop: "20px"}}>Le pere Noël t'as attribué :</h1>
          <p style={{
            margin: "auto",
            fontSize: "60px",
            fontWeight: "bold",
            color: "red",
          }}>{picked.name} !</p>

          <p style={styles.paragraph}>ne {picked.gender === "male" ? "le" : "la"} déçoit pas ;)</p>
          <img width={window.innerWidth < 500 ? "100%" : "338px"} style={styles.img} src="santa.jpg"/>

        </div>
      </div>
    )
  }

  renderAllPicked() {
    return (
      <div style={styles.mainContainer}>
        <div style={{...styles.container, height: "100vh"}}>
          <h1 style={{margin: "auto"}}>Tout le monde à pioché, à vous de jouer mes p'tits loups ! ;)</h1>
          <img width="50%" style={{margin: "auto"}} src="all_picked.jpg"/>

        </div>
      </div>
    )
  }

  render() {
    console.log(this.state.names);
    if (this.state.picked.name)
      return this.renderPicked()
    else if (this.state.names === null)
      return this.renderAllPicked()
    else
      return this.renderForm()
  }
}

var width = window.innerWidth;

const styles = {
  mainContainer: {
    backgroundImage: "url('snow.jpg')",
  },
  container: {
    margin: 'auto',
    boxShadow: "0px 0px 103px -9px rgba(240,17,17,1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "space-around",
    width: window.innerWidth < 500 ? "100%" : "70%",
    margin: "auto",
    backgroundColor: "#fff"
  },
  button: {

  },
  paragraph: {
    margin: "auto",
    marginBottom: 0,
    fontStyle: "italic"
  },
  img: {
    margin: "0 auto",
    marginBottom: "10px",
    width: window.innerWidth < 500 ? "100%" : "338px"
  },
  title: {
    margin: "20px auto",
    textAlign: 'center'
  },
  input: {
    fontSize: "20px",
    width: window.innerWidth < 500 ? "100%" : "50%",
    height: "30px",
    margin: "50px auto"
  }
}

export default App;
