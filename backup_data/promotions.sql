insert into shieldtify.promotions (code, description, type, condition, discount_rate, max_discount, start_date, end_date, created_at, updated_at)
values  ('test', 'abc', 'by item', '{
    "category": ["03b25cfb-7ee1-411d-95e2-d9ad25ec81cf"],
    "item": ["03d2bb85-ac19-4207-981d-affd68b745b0", "0df6c503-521c-45d4-9c9f-78677e8783c4"]
}', 0.2, 50, '2023-11-26 17:24:03', '2024-11-30 20:24:14', '2023-11-26 17:24:16', '2023-11-26 17:24:17'),
        ('test2', 'cde', 'by total', '{
"total": "170"
}', 0.5, 50, '2023-11-26 17:37:02', '2024-11-30 17:37:03', '2023-11-26 17:37:04', '2023-11-26 17:37:06');