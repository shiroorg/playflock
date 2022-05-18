const e = React.createElement;

class FormInput extends React.Component {
    render() {
        return (
            <div className={this.props.size} >
                <input type="text" value={this.props.val} className="form-control" id={this.props.id} placeholder={this.props.id}/>
            </div>
        );
    }
}

class FormCreate extends React.Component {

    constructor(props) {
        super(props);

        if(!props.unit) {
            props.unit = {
                hp: "",
                maxHp: "",
                mana: "",
                maxMana: "",
                armor: "",
                magResist: "",
                x: "",
                y: "",
                unitClass: ""
            }
        }
    }

    handleClick(e) {
        e.preventDefault();

        let unitData = {
            hp: parseInt($("#currentHp").val()),
            maxHp: parseInt($("#maxHp").val()),
            mana: parseInt($("#currentMana").val()),
            maxMana: parseInt($("#maxMana").val()),
            armor: parseInt($("#armor").val()),
            magResist: parseInt($("#magResist").val()),
            x: parseInt($("#x").val()),
            y: parseInt($("#y").val()),
            unitClass: $("#unitClass").val()
        };

        if(unitData.hp > unitData.maxHp) {
            alert('Error: HP more MaxHP');
            return false;
        }
        if(unitData.mana > unitData.maxMana) {
            alert('Error: Mana more MaxMana');
            return false;
        }

        $("#submitUnit").attr('disabled', true)

        $.post({
            type: "POST",
            url: 'http://localhost:3000/api/unit/edit',
            data: unitData,
            success: function (response) {

                if(response.error) {
                    alert(response.error);
                }

                $("#submitUnit").attr('disabled', null)
            },
        });

    }

    render() {

        return (
            <form action="#" className="row">
                <FormInput id="unitId" val={this.props.unit._id} size="mb-3 col-12" />
                <FormInput id="currentHp" val={this.props.unit.hp} size="mb-3 col-6" />
                <FormInput id="maxHp" val={this.props.unit.maxHp} size="mb-3 col-6" />
                <FormInput id="currentMana" val={this.props.unit.mana} size="mb-3 col-6" />
                <FormInput id="maxMana" val={this.props.unit.maxMana} size="mb-3 col-6" />
                <FormInput id="armor" val={this.props.unit.armor} size="mb-3 col-12" />
                <FormInput id="magResist" val={this.props.unit.magResist} size="mb-3 col-12" />
                <div className="mb-3 col-12">
                    <select id='unitClass' value={this.props.unit.unitClass} className="form-control">
                        <option value="warrior">warrior</option>
                        <option value="archer">archer</option>
                        <option value="magician">magician</option>
                    </select>
                </div>
                <FormInput id="x" val={this.props.unit.x} size="mb-3 col-6" />
                <FormInput id="y" val={this.props.unit.y} size="mb-3 col-6" />
                <div className="mb-3 col-12">
                    <button type="text" className="form-control btn-success" id="submitUnit" onClick={this.handleClick}>Update</button>
                </div>
            </form>
        );
    }
}

class ItemListUnit extends React.Component {
    constructor(props) {
        super(props);
    }

    editItem = function (e) {
        let target = $(e.target).attr('data-id');
        const domContainer = document.querySelector('#create-unit');
        const root = ReactDOM.createRoot(domContainer);
        root.render(<FormCreate unit={window.unitList[target]}/>);
    }

    render() {
        window.unitList[this.props.item._id] = this.props.item;
        let unit = this.props.item;
        return (<div className="mb-3 row">
            <div className="col-4">
                <div className="m-2 p-1">{unit._id}</div>
            </div>
            <div className="col-5">
                <div className="m-1 btn btn-danger">{unit.hp}</div>
                <div className="m-1 btn btn-primary">{unit.mana}</div>
                <div className="m-1 btn btn-warning">{unit.unitClass}</div>
            </div>
            <div className="col-3">
                <a href="#" className="m-1 btn btn-info" onClick={this.editItem} data-id={unit._id}> Edit </a>
                <a href="#" className="m-1 btn btn-info" data-id={unit._id}> Delete </a>
            </div>
        </div>)
    }
}

class ListUnit extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <form action="#" className="row">
                {this.props.unitMap.map(function(unit, index){
                    return (<ItemListUnit key={index} item={unit}/>)
                }) }
            </form>
        );

    }
}

// const domContainer = document.querySelector('#create-unit');
// const root = ReactDOM.createRoot(domContainer);
// root.render(<ListUnit/>);

$(".edit-unit").click(function (e) {
    console.log('click');
});

let unitMap = [];
window.unitList = {};
$.post({
    type: "GET",
    url: 'http://localhost:3000/api/unit/list',
    success: function (response) {

        if(response.error) {
            alert(response.error);
        }

        $.each(response, function (key, value) {
            unitMap.push(value);
        });

        const domContainer = document.querySelector('#list-unit');
        const root = ReactDOM.createRoot(domContainer);
        root.render(<ListUnit unitMap={unitMap} />);

    },
});


