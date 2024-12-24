import { Input } from "@/components/ui/input";

const PointsInput = ({ points, negativePoints, setPoints, setNegativePoints }) => (
  <div className="mb-6 flex gap-4 mt-6">
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center">
        <label className="text-sm font-medium text-gray-700 mb-1">Points</label>
        <div className="relative flex items-center border border-gray-300 rounded-md w-28">
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="0"
            className="w-full px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
            value={isNaN(points) ? "" : points}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setPoints(value === "" ? 0 : parseInt(value));
              }
            }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <label className="text-sm font-medium text-gray-700 mb-1">Negative Points</label>
        <div className="relative flex items-center border border-gray-300 rounded-md w-28">
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="0"
            className="w-full px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-md"
            value={isNaN(negativePoints) ? "" : negativePoints}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setNegativePoints(value === "" ? 0 : parseInt(value));
              }
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default PointsInput;


