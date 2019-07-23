class CreateShares < ActiveRecord::Migration[5.0]
  def change
    create_table :shares do |t|
      t.text :content
      t.text   :image
      t.text   :location
      t.integer :user_id
      t.timestamps
    end
  end
end
