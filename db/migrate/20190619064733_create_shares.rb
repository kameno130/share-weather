class CreateShares < ActiveRecord::Migration[5.0]
  def change
    create_table :shares do |t|
      t.string :content
      t.string   :location
      t.string :title
      t.integer :user_id
      t.timestamps
    end
  end
end
