const GroupButtons = () => {
  return (
    <div className="bg-fuchsia flex">
      <button className="bg-yellow hover:bg-sky-700 mb-3">
        Save
      </button>

      <button className="dark:md:hover:bg-fuchsia-600">
        Save
      </button>

      <button className="bg-yellow hover:bg-yellow-700">
        Save
      </button>
      
      <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
        Save changes
      </button>
    </div>
  )
}

export default GroupButtons