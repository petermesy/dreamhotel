import sqlite3
import os
path = os.path.join(os.getcwd(), "prisma", "dev.db")
conn = sqlite3.connect(path)
cur = conn.cursor()
for row in cur.execute("SELECT id, url FROM GalleryImage ORDER BY createdAt DESC LIMIT 10"):
    print(row)
conn.close()
