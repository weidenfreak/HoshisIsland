class RemoveTextFromStickies < ActiveRecord::Migration
  def change
    remove_column :stickies, :text, :text
  end
end
