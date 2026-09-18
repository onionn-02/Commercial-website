-- Sample data. Replace with the real product list (or edit later from the Phase 4 admin).

insert into public.categories (slug, name, sort_order) values
  ('engine-oils', 'Engine Oils', 1),
  ('brake-shoes', 'Brake Shoes & Pads', 2),
  ('filters', 'Filters', 3),
  ('batteries', 'Batteries', 4),
  ('spark-plugs', 'Spark Plugs', 5),
  ('chains', 'Chains & Sprockets', 6)
on conflict (slug) do nothing;

insert into public.products (slug, name, brand, category_slug, price, size, description, specs, compatible_with, in_stock) values
  ('castrol-activ-4t-10w30-1l', 'Activ 4T 10W-30', 'Castrol', 'engine-oils', 480, '1 L',
   'Semi-synthetic 4-stroke engine oil for everyday motorcycle use.',
   '[{"label":"Grade","value":"10W-30"},{"label":"Type","value":"Semi-synthetic"},{"label":"Pack","value":"1 L"}]',
   '{Splendor,Passion,"Pulsar 150",Activa}', true),
  ('servo-4t-plus-20w40-900ml', '4T Plus 20W-40', 'Servo', 'engine-oils', 360, '900 ml',
   'Mineral 4-stroke engine oil, good value for older bikes.',
   '[{"label":"Grade","value":"20W-40"},{"label":"Type","value":"Mineral"},{"label":"Pack","value":"900 ml"}]',
   '{Splendor,"CD 100",Platina}', true),
  ('mrf-brake-shoe-set-rear', 'Rear Brake Shoe Set', 'MRF', 'brake-shoes', 220, 'Set of 2',
   'Long-life rear drum brake shoes with strong, quiet stopping power.',
   '[{"label":"Position","value":"Rear"},{"label":"Type","value":"Drum"},{"label":"Pack","value":"Set of 2"}]',
   '{Splendor,Passion,Glamour}', true),
  ('bosch-front-disc-pad-set', 'Front Disc Brake Pad Set', 'Bosch', 'brake-shoes', 550, 'Set of 2',
   'Low-dust front disc pads for reliable braking in all weather.',
   '[{"label":"Position","value":"Front"},{"label":"Type","value":"Disc"},{"label":"Pack","value":"Set of 2"}]',
   '{"Pulsar 150","Apache RTR",Unicorn}', true),
  ('hiflofiltro-oil-filter', 'Oil Filter', 'Hiflofiltro', 'filters', 180, null,
   'High-quality oil filter to keep your engine clean.',
   '[{"label":"Type","value":"Oil filter"},{"label":"Pack","value":"1 pc"}]',
   '{"Pulsar 150","Pulsar 180",Avenger}', true),
  ('exide-12v-5ah-battery', '12V 5Ah Battery', 'Exide', 'batteries', 1150, null,
   'Maintenance-free two-wheeler battery.',
   '[{"label":"Voltage","value":"12 V"},{"label":"Capacity","value":"5 Ah"}]',
   '{Activa,Jupiter,Splendor}', false),
  ('ngk-spark-plug-cr7hsa', 'Spark Plug CR7HSA', 'NGK', 'spark-plugs', 140, null,
   'Standard spark plug for smooth starts and steady idle.',
   '[{"label":"Model","value":"CR7HSA"},{"label":"Pack","value":"1 pc"}]',
   '{Activa,Splendor,Platina}', true),
  ('tvs-chain-sprocket-kit', 'Chain & Sprocket Kit', 'TVS', 'chains', 950, 'Kit',
   'Chain with front and rear sprockets, sold as a matched kit.',
   '[{"label":"Contents","value":"Chain + 2 sprockets"},{"label":"Pack","value":"1 kit"}]',
   '{"Apache RTR",Victor}', true)
on conflict (slug) do nothing;
