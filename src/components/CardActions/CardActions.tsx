import React from 'react';
import { useCardStore } from '../../store/useCardStore';
import styles from './CardActions.module.css';
import IconGPay from '../../assets/GPay.svg';
import FreezeCard from "../../assets/freeze_card.svg";
import SpeedLimit from "../../assets/spend_limit.svg";
import DeactivateCard from "../../assets/deactivate_card.svg";
import ReplaceCard from "../../assets/replace_card.svg";

interface ActionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const CardActions: React.FC = () => {
  const { cards, activeCardIndex, freezeCard } = useCardStore();
  const activeCard = cards[activeCardIndex];
  const isFrozen = activeCard?.frozen ?? false;

  const handleFreeze = () => {
    if (activeCard) freezeCard(activeCard.id);
  };

  const actions: ActionItem[] = [
    {
      id: 'freeze',
      label: isFrozen ? 'Unfreeze\ncard' : 'Freeze\ncard',
      icon: <img src={FreezeCard} alt="Aspire logo" />,
      onClick: handleFreeze,
    },
    { id: 'limit',   label: 'Set spend\nlimit',  icon: <img src={SpeedLimit} alt="SpeedLimit logo" /> },
    { id: 'gpay',    label: 'Add to\nGPay',      icon: <img src={IconGPay} alt="IconGPay logo" /> },
    { id: 'replace', label: 'Replace\ncard',      icon: <img src={ReplaceCard} alt="ReplaceCard logo" /> },
    { id: 'cancel',  label: 'Cancel\ncard',       icon: <img src={DeactivateCard} alt="DeactivateCard logo" /> },
  ];

  return (
    <div className={styles.actions}>
      {actions.map((action) => (
        <button
          key={action.id}
          className={`${styles.actionBtn} ${action.id === 'freeze' && isFrozen ? styles.actionBtnActive : ''}`}
          onClick={action.onClick}
          aria-pressed={action.id === 'freeze' ? isFrozen : undefined}
          title={action.label.replace('\n', ' ')}
        >
          <div className={styles.iconWrapper}>{action.icon}</div>
          <span className={styles.label}>{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CardActions;