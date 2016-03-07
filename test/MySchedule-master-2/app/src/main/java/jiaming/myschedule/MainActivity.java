package jiaming.myschedule;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import junit.framework.Assert;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

//more and more
public class MainActivity extends ActionBarActivity implements OnClickListener, OnItemClickListener {

    private ArrayAdapter<String> adapter;

    // Any List Interface Data Structure
    private ArrayList<String> listItems = new ArrayList<String>();;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        View prevButton = findViewById(R.id.button);
        prevButton.setOnClickListener(this);

        readItems();

        ListView listView = (ListView)this.findViewById(R.id.listOfschedule);
        adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1 , listItems);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(this);
    }

    // This is for button clicks
    @Override
    public void onClick(View arg0) {
        Assert.assertNotNull(arg0);
        // Get string entered
        TextView tv = (TextView) findViewById(R.id.scheduletext);
        // Add string to underlying data structure
        listItems.add(tv.getText().toString());
        // Notify adapter that underlying data structure changed
        adapter.notifyDataSetChanged();
        writeItems();

    }

    // This is for selecting an item from the list
    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        Intent intent = new Intent(MainActivity.this, PickerActivity.class);
        startActivity(intent);
    }


    private void readItems () {
        File filesDir = getFilesDir();
        File scheduleFile = new File (filesDir, "schedule.txt");
        try{
            listItems = new ArrayList<String>(FileUtils.readLines(scheduleFile));
        } catch (IOException e) {
            listItems = new ArrayList<String>();
        }
    }

    private void writeItems () {
        File fileDir = getFilesDir();
        File scheduleFile = new File (fileDir, "schedule.txt");
        try {
            FileUtils.writeLines(scheduleFile, listItems);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}

