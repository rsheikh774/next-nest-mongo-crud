// nextjs-frontend/pages/index.js
import { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../service/api';
import Link from 'next/link';
import styles from '../styles/index.module.css';

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const data = await getItems();
      setItems(data);
    }
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    await deleteItem(id);
    setItems(items.filter((item) => item._id !== id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Items List</h1>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item._id} className={styles['list-item']}>
            <div className={styles['item-info']}>
              {item.name} - {item.description} - ${item.price}
            </div>
            <div className={styles.buttons}>
              <button className={styles.button} onClick={() => handleDelete(item._id)}>
                Delete
              </button>
              <Link href={`/edit/${item._id}`} className={styles.button}>
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <Link href="/add" className={styles['add-link']}>
        Add Item
      </Link>
    </div>
  );
}
