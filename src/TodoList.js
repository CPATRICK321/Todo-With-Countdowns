import { Component } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import "./TodoList.css";

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      Todos: [],
      CurCount: []
    };
  }

  componentDidMount() {
    setInterval(this.timer.bind(this), 1000);
  }

  timer() {
    this.setState({
      CurCount: this.state.CurCount.map((toBeChanged) => {
        return toBeChanged - 1;
      }),
    });
  }

  update(list) {
    this.setState({
      Todos: list,
    });
  }

  updateTime(times) {
    this.setState({
      CurCount: times,
    });
  }

  render() {
    const list = [...this.state.Todos];
    const times = [...this.state.CurCount];
    const finishedCheck = (index) => {
      if (this.state.CurCount[index] > 0) {
        return (
          <td key={index + "2"} className="timedis">
            {parseInt(this.state.CurCount[index] / 3600) < 10 ? "0" + parseInt(this.state.CurCount[index] / 3600):parseInt(this.state.CurCount[index] / 3600)}:{" "}
            {parseInt((this.state.CurCount[index] % 3600) / 60) < 10 ? "0" + parseInt((this.state.CurCount[index] % 3600) / 60):parseInt((this.state.CurCount[index] % 3600) / 60)}:{" "}
            {parseInt(this.state.CurCount[index] % 60) < 10 ? "0" + parseInt(this.state.CurCount[index] % 60): parseInt(this.state.CurCount[index] % 60)}
          </td>
        );
      } else {
        return <td key={index + "2"} className="timedis">Time is up</td>;
      }
    };
    return (
      <>
        <input type="text" id="item"></input>
        <input type="time" id="timeinp"></input>
        <span
          onClick={() => {
            //INPUT TIME IN SECONDS
            if (
              document.getElementById("item").value !== "" &&
              document.getElementById("timeinp").value !== ""
            ) {
              let hoursMin = document
                .getElementById("timeinp")
                .value.split(":");
              let mins = 0;
              let hours = 0;
              if (hoursMin[0] === "") {
                hours = 0;
              } else {
                hours = hoursMin[0];
              }
              if (hoursMin[1] === "") {
                mins = 0;
              } else {
                mins = hoursMin[1];
              }
              let totalInpSecs = hours * 60 * 60 + mins * 60;
              //CALCULATE CURRENT TIME IN SECONDS
              let totalNowSecs =
                new Date().getHours() * 60 * 60 +
                new Date().getMinutes() * 60 +
                new Date().getSeconds();
              let totalSecs = 0;
              totalInpSecs > totalNowSecs
                ? (totalSecs = totalInpSecs - totalNowSecs)
                : (totalSecs = totalInpSecs + 86400 - totalNowSecs);
              //UPDATE STATE AND RESET INPUT FIELDS
              list.push(document.getElementById("item").value);
              this.update(list);
              document.getElementById("item").value = "";
              times.push(totalSecs);
              this.updateTime(times);
              document.getElementById("timeinp").value = "";
            }
          }}
        >
          <AiOutlinePlus />
        </span>
        <div id="table-scroll" key={1}>
          <table>
            {this.state.Todos.map((item, index) => (
              <tbody key={index + "tb"}>
                <tr key={index + "tr"}>
                  <td
                  className="itemdis"
                    key={index}
                    onClick={() => {
                      if (index > -1) {
                        list.splice(index, 1);
                      }
                      this.update(list);
                      if (index > -1) {
                        times.splice(index, 1);
                      }
                      this.updateTime(times);
                    }}
                  >
                    <AiOutlineMinus className="minus" />
                    {item}
                  </td>
                  {finishedCheck(index)}
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </>
    );
  }
}

export default TodoList;
