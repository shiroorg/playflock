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

    handleClick() {



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

const domContainer = document.querySelector('#create-unit');
const root = ReactDOM.createRoot(domContainer);
root.render(e(FormCreate));
