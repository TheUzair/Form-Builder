import { Input } from "@/components/ui/input";

const PointsInput = ({ points, negativePoints, onChange }) => {
  const handlePointsChange = (value) => {
    onChange({ points: parseInt(value) || 0 });
  };

  const handleNegativePointsChange = (value) => {
    onChange({ negativePoints: parseInt(value) || 0 });
  };

  return (
    <div className="flex items-center gap-6 mb-6">
      <div className="flex flex-col items-center">
        <label className="text-sm font-medium text-gray-700 mb-1">Points</label>
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="0"
          className="w-28 text-center"
          value={isNaN(points) ? "" : points}
          onChange={(e) => handlePointsChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Negative Points
        </label>
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="0"
          className="w-28 text-center"
          value={isNaN(negativePoints) ? "" : negativePoints}
          onChange={(e) => handleNegativePointsChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PointsInput;
