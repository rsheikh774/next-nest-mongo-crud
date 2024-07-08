// nextjs-frontend/pages/edit/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getItem, updateItem } from '../../service/api';
import styles from '../../styles/editItem.module.css';

export default function EditItem() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (id) {
      async function fetchItem() {
        const data = await getItem(id);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
      }
      fetchItem();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateItem(id, { name, description, price: parseFloat(price) });
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Edit Item</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles['form-group']}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Update</button>
      </form>
    </div>
  );
}
