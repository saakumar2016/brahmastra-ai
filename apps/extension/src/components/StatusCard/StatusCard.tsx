import Card from "../Card";
import styles from "./StatusCard.module.css";

interface StatusItem {
  label: string;
  value: string;
}

interface StatusCardProps {
  items: StatusItem[];
}

function StatusCard({ items }: StatusCardProps) {
  return (
    <Card>
      {items.map((item) => (
        <div key={item.label} className={styles.row}>
          <span className={styles.label}>{item.label}</span>
          <span className={styles.value}>{item.value}</span>
        </div>
      ))}
    </Card>
  );
}

export default StatusCard;
