import React from "react";
import "./App.css";
import Game from "./game";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.game = new Game();
  }

  componentDidMount = () => {
    setInterval(() => {
      this.game.update();
      this.setState({});
    }, 100);
  };

  update = () => {
    this.game.update();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Modern Çiğ Köfte</h1>
        </header>
        <div>
          <div>
            <p>Çiğ Köfte: {this.game.makedCigKofte}</p>
            <button
              onClick={() => this.game.makeCigKofte()}
              disabled={!this.game.canMakeCigKofte()}
            >
              Çiğ Köfte Yoğur!
            </button>
          </div>
          <div>
            <p>İşletme</p>
            <hr></hr>

            <table>
              <tr>
                <td>Kasadaki Para:</td>

                <td>{this.game.money}</td>
              </tr>

              <tr>
                <td>Dolaptaki Çiğ Köfte:</td>

                <td>{this.game.currentCigKofte}</td>
              </tr>

              <tr className="price">
                <td>Fiyat:</td>
                <td>
                  ${this.game.cigKofteFee}{" "}
                  <button
                    onClick={this.game.decreasePrice}
                    disabled={!this.game.canDecrease()}
                  >
                    -
                  </button>{" "}
                  <button onClick={this.game.increasePrice}>+</button>{" "}
                </td>
              </tr>

              <tr>
                <td>Halkın Talebi:</td>
                <td>{this.game.demandRate}%</td>
              </tr>
            </table>
          </div>
          <div>
            <p>Üretim</p>
            <hr></hr>

            <table>
              <tr>
                <td>Çiğ Köfte / Saniye:</td>
                <td>{this.game.lastManufacturedRate}</td>
              </tr>

              <tr>
                <td>Malzeme:</td>
                <td>
                  {this.game.material}
                  <button
                    disabled={!this.game.canBuyMaterial()}
                    onClick={this.game.buyMaterial}
                  >
                    Satın Al! (${this.game.materialPrice})
                  </button>
                </td>
              </tr>

              <tr>
                <td>Satın Alma Müdürü:</td>
                <td>
                  {this.game.hasAutoBuyer ? (
                    <span>
                      {this.game.isAutoBuyerActive ? (
                        <span>Aktif</span>
                      ) : (
                        <span>Durdu</span>
                      )}
                      {this.game.isAutoBuyerActive ? (
                        <button onClick={this.game.stopAutoBuyer}>
                          Durdur
                        </button>
                      ) : (
                        <button onClick={this.game.activateAutoBuyer}>
                          Aktif Et!
                        </button>
                      )}
                    </span>
                  ) : (
                    <span>
                      Yok{" "}
                      <button
                        onClick={this.game.buyAutoBuyer}
                        disabled={!this.game.canBuyAutoBuyer()}
                        title="reach 2000 cig koftes and make over $15000 money"
                      >
                        Satın Al! (${this.game.autoBuyerPrice})
                      </button>
                    </span>
                  )}
                </td>
              </tr>
            </table>
          </div>

          <div>
            <p>Çalışan</p>
            <hr></hr>

            <table>
              <tr>
                <td>Çırak</td>
                <td>
                  {this.game.helpers.errandBoy}
                  <button
                    onClick={this.game.buyErrandBoy}
                    disabled={!this.game.canBuyErrandBoy()}
                  >
                    Satın Al! (${this.game.helpers.errandBoyCost})
                  </button>
                </td>
              </tr>

              <tr>
                <td>Kalfa</td>
                <td>
                  {this.game.helpers.foreman}
                  <button
                    onClick={this.game.buyForeman}
                    disabled={!this.game.canBuyForeman()}
                  >
                    Satın Al! (${this.game.helpers.foremanCost})
                  </button>
                </td>
              </tr>

              <tr>
                <td>Usta</td>
                <td>
                  {this.game.helpers.master}
                  <button
                    onClick={this.game.buyMaster}
                    disabled={!this.game.canBuyMaster()}
                  >
                    Satın Al! (${this.game.helpers.masterCost})
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
