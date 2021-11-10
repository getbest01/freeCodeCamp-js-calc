import "./App.css";
import {connect } from "react-redux";

function App(props) {
  const padComp = [
    { keyPad: "0", keyId: "zero" },
    { keyPad: "1", keyId: "one" },
    { keyPad: "2", keyId: "two" },
    { keyPad: "3", keyId: "three" },
    { keyPad: "4", keyId: "four" },
    { keyPad: "5", keyId: "five" },
    { keyPad: "6", keyId: "six" },
    { keyPad: "7", keyId: "seven" },
    { keyPad: "8", keyId: "eight" },
    { keyPad: "9", keyId: "nine" },
    { keyPad: ".", keyId: "decimal" },
    { keyPad: "+", keyId: "add" },
    { keyPad: "-", keyId: "subtract" },
    { keyPad: "*", keyId: "multiply" },
    { keyPad: "/", keyId: "divide" },
    { keyPad: "=", keyId: "equals" },
    { keyPad: "clear", keyId: "clear" },
  ];

  //------------------------
  // Redux
  //------------------------


  const mapStateToProps = (state) => {
    return { msg: state };
  };

  const btns = padComp.map((data, idx) => (
    <button
      className="btn btn-primary"
      key={idx}
      id={data.keyId}
      value={data.keyPad}
      onClick={props.handleClick}
    >
      {data.keyPad}
    </button>
  ));

  //component - Redux state injected as props
  const InputPad = (props) => {
    return (
      <div>
        {btns}
        <div>
          <h4 id="display">{props.msg}</h4>
        </div>
      </div>
    );
  };

  const Container = connect(mapStateToProps)(InputPad);


  return (
    <div className="App">
      <div className="btnGrp">
        <Container />
      </div>
    </div>
  );
}

export default App;
