import {useSelector, useDispatch} from "react-redux";
import {setSelectedModel } from '../../app/features';


export default function Models() {
  const dispatch = useDispatch();
  const models = useSelector(state => state.models);
  const selectedModel = useSelector(state => state.selectedModel);

  return (
    <div
      style={{backgroundColor: "#0a0a23", top: "-18rem", boxShadow: "0 0 3rem black"}} 
      className={`max-h-96 w-80 m-2 p-4 absolute left-0 lg:left-20 z-30 rounded-2xl border-gray-500 border-2 text-gray-300 cursor-pointer`}>
      <h1 className="block text-2xl text-center text-gray-400 font-bold">Select a Model</h1>
      <ul className='h-full list-none overflow-y-auto'>
        {
          models.map((model, idx) => (
            <li 
              key={idx}
              style={{backgroundColor: "rgba(255, 255, 255, 0.1)"}} 
              onClick={() => dispatch(setSelectedModel(model))}
              className={`w-full mt-4 p-2 rounded-xl border-2 border-gray-700 hover:text-white overflow-x-auto ${(selectedModel == model) && "border-l-6 border-l-green-600"}`} 
            >{model}</li>))
        }          
      </ul>
    </div>
  )
}
