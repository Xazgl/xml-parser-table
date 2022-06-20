import y from '/public/images/y.png';
import d from '/public/images/d.png';
import t from '/public/images/t.png';
import u from '/public/images/u.png';
import crosslandImg from '/public/images/miniCrossland.jpg';
import zafiraImg from '/public/images/miniZafira.png';



export function CarsMenu() {

    return (
        <>
<div className ="twoModel">
    <div className ="ColumCard">
        <div className ="titleCard">ZAFIRA LIFE</div>
        <div className ="miniTitleCard">Минивэн</div>
        <div className="carImg1"></div>

        <div className ="twoROW">
            <div className ="twoColumCard">

                <div className="inColum">
                    <div className ="row3"> <img className ="mini" src={y.src}/> </div>
                    <div className ="row">150</div>
                    <div className ="row1">Мощность</div>
                </div>

                <div className="inColum">
                    <div className="space"></div>
                    <div className="spaceJ"></div>
                </div>

                <div className="inColum">
                    <div className ="row3"> <img className ="mini" src={d.src}/> </div>
                    <div className ="row">370</div>
                    <div className ="row1">Крутящий Момент,Н-м</div>
                </div>

            </div>



            <div className ="twoColumCard">

                <div className="inColum1">
                    <div className ="row3"> <img className ="mini" src={t.src}/> </div>
                    <div className ="row">12.7</div>
                    <div className ="row1">Разгон до 100км/ч,с</div>
                </div>

                <div className="inColum1">
                  <div className="space"></div>
                  <div className="spaceJ"></div>
                </div>

                <div className="inColum1">
                    <div className ="row3"> <img className ="mini" src={u.src}/> </div>
                    <div className ="row">7,3</div>
                    <div className ="row1">Расход топлива,л/100км</div>
                </div>
            </div>

        </div>

        <div className ="btnCard">
            <form method="get" action="TXL.html" target="_blank">
            <button className="btn"  type="submit">Узнать больше</button>
            </form>
        </div>
    </div>

    <div className ="ColumCard">
        <div className ="titleCard">Crossland</div>
        <div className ="miniTitleCard">Кроссовер</div>
        <div className="carImg"></div>


 
        <div className ="twoROW">

        <div className ="twoColumCard">

            <div className="inColum">
              <div className ="row3"> <img  className ="mini" src={y.src}/> </div>
              <div className ="row">110</div>
              <div className ="row1">Мощность</div>
            </div>

            <div className="inColum">
                <div className="space"></div>
                <div className="spaceJ"></div>
            </div>

            <div className="inColum">
               <div className ="row3"> <img  className ="mini" src={d.src}/> </div>
               <div className ="row">205</div>
               <div className ="row1">Крутящий Момент,Н-м</div>
            </div>

        </div>

        <div className ="twoColumCard">
            <div className="inColum1">
                <div className ="row3"> <img  className ="mini" src={t.src}/> </div>
                <div className ="row">10.9</div>
                <div className ="row1">Разгон до 100км/ч,с</div>
            </div>
            <div className="inColum1">
                <div className="space"></div>
                <div className="spaceJ"></div>
            </div>
            <div className="inColum1">
                <div className ="row3"> <img  className ="mini" src={u.src}/> </div>
                <div className ="row">8.3</div>
                <div className ="row1">Расход топлива,л/100км</div>
            </div>
        </div>

    </div>
        <div className ="btnCard">
            <form method="get" action="VX.html" target="_blank">
                <button className="btn">Узнать больше</button>
            </form>
        </div>
</div>


</div>

<style jsx>{`
.twoModel {
    display:flex;
    flex-direction: row;
    margin-top:100px;
    justify-content: space-around;

}

.ColumCard {
    display: flex;
    align-items: center;
    flex-direction: row;
    max-height: inherit;

}

.titleCard {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 60px;
    font-weight: 300;
}

.miniTitleCard {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 30px;
    color: #65656c;
    font-weight: 100;
}

.carImg {
    display: flex;
    width: 600px;
    height: 250px;
    background-image: url('${crosslandImg.src}');
    background-size: contain;
    background-repeat: no-repeat
}
.carImg1 {
    display: flex;
    width: 600px;
    height: 250px;
    background-image: url('${zafiraImg.src}');
    background-size: contain;
    background-repeat: no-repeat
}
.twoROW {
    display: flex;
    flex-direction: row;
}
.ColumCard {
    display: flex;
    justify-content: space-between;
    flex-direction: column;

}

.inColum {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 30px;
    margin-bottom: 80px;
}

.inColum1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 30px;
    margin-bottom: 80px;
    margin-left: 100px;
}

.row {
    display: inline-flex;
    justify-content: center;
    align-items: baseline;
    font-family: 'Montserrat', sans-serif;
    font-size: 80px;
    font-weight: 100;
}

.row1 {
    display: inline-flex;
    justify-content: center;
    align-items: baseline;
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    color: #65656c;
}

.row3 {
    display: flex;
    justify-content: center;
}

.twoColumCard {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
}


.btnCard {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

.btn {
    font-family: 'Montserrat', sans-serif;
    border-radius: 3px;
    border:none;
    transition: transform.3s ;
    color: #f7ff14;

    background-color:black;
    width: 220px;
    height: 50px;
    font-size: 20px;
    padding: 12px;
}



.btn:hover {
    background-color: #f7ff14;
    font-size: 20px;
    border: none;
    font-family: 'Montserrat', sans-serif;
    color:black;
}
  }
`}</style>

 </>
    )
}