import DisaHeader from './DisaHeader.js';

const Disapage = () => (
    <div>
        <DisaHeader />
        <div className="p-grid" style={{"margin": "0"}}>
            <div className="p-col p-d-flex p-dir-col" style={{ "backgroundColor": "red" }}>
                <span>Hallo</span>
                <span>Welt</span>
            </div>
            <div className="p-col"></div>
        </div>
    </div>
);

export default Disapage;