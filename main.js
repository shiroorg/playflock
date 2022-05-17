const e = React.createElement;

class FormInput extends React.Component {
    render() {
        return (
            <div className={this.props.size} >
                <input type="text" className="form-control" id={this.props.id} placeholder={this.props.id}/>
            </div>
        );
    }
}

class FormCreate extends React.Component {

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
                <FormInput id="unitId" size="mb-3 col-12" />
                <FormInput id="currentHp" size="mb-3 col-6" />
                <FormInput id="maxHp" size="mb-3 col-6" />
                <FormInput id="currentMana" size="mb-3 col-6" />
                <FormInput id="maxMana" size="mb-3 col-6" />
                <FormInput id="armor" size="mb-3 col-12" />
                <FormInput id="magResist" size="mb-3 col-12" />
                <div className="mb-3 col-12">
                    <select id='unitClass' className="form-control">
                        <option value="warrior">warrior</option>
                        <option value="archer">archer</option>
                        <option value="magician">magician</option>
                    </select>
                </div>
                <FormInput id="x" size="mb-3 col-6" />
                <FormInput id="y" size="mb-3 col-6" />
                <div className="mb-3 col-12">
                    <button type="text" className="form-control btn-success" id="submitUnit" onClick={this.handleClick}>Update</button>
                </div>
            </form>
        );
    }
}

class ListUnit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            unitList: {},
            unitMap: [],
        };
    }

    render() {

        let unitList = {};
        let unitMap = [];
        $.post({
            type: "GET",
            url: 'http://localhost:3000/api/unit/list',
            success: function (response) {

                if(response.error) {
                    alert(response.error);
                }

                $.each(response, function (key, value) {
                    unitList[value._id] = value;
                    unitMap.push(value._id);
                });

                this.setState({
                    unitList: unitList,
                    unitMap: unitMap,
                });

            },
        });

        return (
            <form action="#" className="row">
                { this.state.unitMap.map(function(unit, index){
                    return (<div key={index} className="mb-3 col-12">{unit}</div>)
                }) }
            </form>
        );
    }
}

// const domContainer = document.querySelector('#create-unit');
// const root = ReactDOM.createRoot(domContainer);
// root.render(<ListUnit/>);

const domContainer = document.querySelector('#list-unit');
const root = ReactDOM.createRoot(domContainer);
root.render(e(ListUnit));
