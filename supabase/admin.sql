-- Phase 4: lets logged-in admins manage the catalog. Run once in the Supabase SQL Editor.
--
-- IMPORTANT: also turn OFF public sign-ups (Authentication -> Sign In / Providers -> "Allow new users to sign up"),
-- then create the admin login yourself under Authentication -> Users -> Add user. Every account that exists
-- is treated as an admin, so only accounts you create should exist.

-- Categories
create policy "Admins can insert categories" on public.categories for insert to authenticated with check (true);
create policy "Admins can update categories" on public.categories for update to authenticated using (true) with check (true);
create policy "Admins can delete categories" on public.categories for delete to authenticated using (true);

-- Products
create policy "Admins can insert products" on public.products for insert to authenticated with check (true);
create policy "Admins can update products" on public.products for update to authenticated using (true) with check (true);
create policy "Admins can delete products" on public.products for delete to authenticated using (true);

-- Orders log: admins can read and clean up (the public can still only insert)
create policy "Admins can read orders" on public.orders for select to authenticated using (true);
create policy "Admins can delete orders" on public.orders for delete to authenticated using (true);

-- Product photos
create policy "Admins can upload product images" on storage.objects
  for insert to authenticated with check (bucket_id = 'product-images');
create policy "Admins can replace product images" on storage.objects
  for update to authenticated using (bucket_id = 'product-images');
create policy "Admins can delete product images" on storage.objects
  for delete to authenticated using (bucket_id = 'product-images');
