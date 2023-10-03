import WasteForm from "../../components/wasteForm/wasteForm"
import TrashForm from "../../components/trashForm/trashForm"

function AddToList() {
    return (
      <div className='midSection'>
        <WasteForm />
        <TrashForm />
      </div>
    );
  }

export default AddToList