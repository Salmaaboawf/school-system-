const TeacherRoutine = () => {
  return (
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 ">
      <h1 className="text-3xl">classss routine</h1>
      <span className="text-2xl">teacher/salma</span>
      <div className="overflow-hidden min-w-full ">
        <table className="min-w-full text-center text-sm font-light ">
          <thead className="border-b bg-neutral-700 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
            <tr>
              <th scope="col" className="px-6 py-4">
                day
              </th>
              <th scope="col" className="px-6 py-4">
                7:00-9:00
              </th>
              <th scope="col" className="px-6 py-4">
                9:00-11:00
              </th>
              <th scope="col" className="px-6 py-4">
                11:00-1:00
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                sun
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">A-1</td>

              <td className="whitespace-nowrap px-6 py-4 text-2xl">B-1</td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">C-2</td>
            </tr>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                mon
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">B-2</td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">C-2</td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">B-1</td>
            </tr>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                Tue
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">A-1</td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">B-1</td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">B-2</td>
            </tr>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                Wed
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">A-2</td>

              <td className="whitespace-nowrap px-6 py-4 text-2xl">A-2</td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">B-1</td>
            </tr>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                Thr
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">A-1</td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">B-1</td>

              <td className="whitespace-nowrap px-6 py-4 text-2xl">C-1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherRoutine;
