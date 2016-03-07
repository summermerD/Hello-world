package jiaming.myschedule;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;


public class PickDateActivity extends Activity {

    Button button;
    private DatePicker datePicker;

    @Override
    public  void onCreate(Bundle saveInstanceState) {
        super.onCreate(saveInstanceState);
        setContentView(R.layout.activity_pickdate);

        addListenerOnButton();
    }

    public String addListenerOnButton() {

        final Context context = this;
        String returnDate;

        button = (Button) findViewById(R.id.goback);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent data = new Intent ();
//                startActivity(data);
//                Calendar mcurrentDate = Calendar.getInstance();
//                int mYear = mcurrentDate.get(Calendar.YEAR);
//                int mMonth = mcurrentDate.get(Calendar.MONTH);
//                int mDay = mcurrentDate.get(Calendar.DAY_OF_MONTH);
//                datePicker = (DatePicker)findViewById(R.id.dpResult);
//
//                data.putExtra("Year", Integer.toString(mYear));
//                data.putExtra("Month", Integer.toString(mMonth));
//                data.putExtra("Day", Integer.toString(mDay));
//                setResult(RESULT_OK, data) ;


            }
        });
        returnDate = datePicker.toString();
        return returnDate;
    }



}

