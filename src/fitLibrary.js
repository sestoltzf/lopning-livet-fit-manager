import React, { useState, useRef } from 'react';
import { Upload, Download, FileText, Watch, Usb, CheckCircle, AlertCircle, Trash2, Info, ChevronDown, ChevronRight } from 'lucide-react';

// FIT Library data - bäddat direkt i komponenten
const fitLibrary = {
  backpass: [
    {
      id: 'back-1',
      name: 'Backpass 3x(60-45-30s)',
      filename: '__Backpass_3x(60-...0s)_workout (1) (1).fit',
      description: '3 serier med 60s, 45s, 30s uppför backe',
      difficulty: 'Hög',
      duration: '45-60 min',
      type: 'Backpass'
    },
    {
      id: 'back-2',
      name: 'Backpass 10x45s',
      filename: '__Backpass_10x45s_workout (1) (1).fit',
      description: '10 x 45 sekunder uppför backe',
      difficulty: 'Hög',
      duration: '40-50 min',
      type: 'Backpass'
    },
    {
      id: 'back-3',
      name: 'Backpass 4x60-45-30s',
      filename: 'Backpass_4x60-45-30s_workout (1).fit',
      description: '4 serier med 60s, 45s, 30s uppför backe',
      difficulty: 'Hög',
      duration: '50-65 min',
      type: 'Backpass'
    },
    {
      id: 'back-4',
      name: 'Backpass 10x60s under',
      filename: 'Backpass_10_x_60_...under_workout (1).fit',
      description: '10 x 60s uppför med jogg ner',
      difficulty: 'Hög',
      duration: '45-60 min',
      type: 'Backpass'
    }
  ],
  fartlek: [
    {
      id: 'fartlek-1',
      name: 'Fartlek 1-2-3-4-4-3-2-1',
      filename: '__Fartlek_1-2-3-4-4-3-2-1_workout (1).fit',
      description: 'Pyramid-fartlek med uppbyggnad',
      difficulty: 'Medel',
      duration: '50-65 min',
      type: 'Fartlek'
    },
    {
      id: 'fartlek-2',
      name: 'Fartlek 2x3-2-1 min',
      filename: '__Fartlek_2x3-2-1_min_workout (1) (1).fit',
      description: '2 serier med 3-2-1 min intervaller',
      difficulty: 'Medel',
      duration: '45-55 min',
      type: 'Fartlek'
    },
    {
      id: 'fartlek-3',
      name: 'Fartlek 4x4+2x2min',
      filename: '__Fartlek_4x4+2x2min_workout (1) (1).fit',
      description: '4x4min + 2x2min varierat tempo',
      difficulty: 'Hög',
      duration: '55-70 min',
      type: 'Fartlek'
    },
    {
      id: 'fartlek-4',
      name: 'Fartlek 4x5min',
      filename: '__Fartlek_4x5min_workout (1).fit',
      description: '4 x 5 minuter i varierat tempo',
      difficulty: 'Hög',
      duration: '50-65 min',
      type: 'Fartlek'
    },
    {
      id: 'fartlek-5',
      name: 'Fartlek 5x60s...45',
      filename: '__Fartlek_5x60_60s...45_workout (1) (1).fit',
      description: '5 x 60s med 45s vila',
      difficulty: 'Medel',
      duration: '35-45 min',
      type: 'Fartlek'
    },
    {
      id: 'fartlek-6',
      name: 'Fartlek 8-6-4-2 min',
      filename: '__Fartlek_8-6-4-2_min_workout (1).fit',
      description: 'Nedtrappning: 8-6-4-2 minuter',
      difficulty: 'Hög',
      duration: '60-75 min',
      type: 'Fartlek'
    },
    {
      id: 'fartlek-7',
      name: 'Fartlek 2x6_2x4_2x2 min',
      filename: 'Fartlek_2x6_2x4_2x2_min_workout (2).fit',
      description: '2x6min + 2x4min + 2x2min',
      difficulty: 'Hög',
      duration: '65-80 min',
      type: 'Fartlek'
    },
    {
      id: 'fartlek-8',
      name: 'Fartlek 5x2_-_5x1 min',
      filename: 'Fartlek_5x2_-_5x1_min_workout (1).fit',
      description: '5x2min + 5x1min intervaller',
      difficulty: 'Medel',
      duration: '45-60 min',
      type: 'Fartlek'
    },
    {
      id: 'fartlek-9',
      name: 'Fartlek 6-5-4-3-2-1 min',
      filename: 'Fartlek_6-5-4-3-2-1_min_workout (1).fit',
      description: 'Nedtrappning från 6 till 1 minut',
      difficulty: 'Hög',
      duration: '60-75 min',
      type: 'Fartlek'
    }
  ],
  fartpass: [
    {
      id: 'fart-1',
      name: 'Fartpass 2x6km',
      filename: '__Fartpass_2x6km_workout (1).fit',
      description: '2 x 6km i fartpass-tempo',
      difficulty: 'Hög',
      duration: '70-85 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-2',
      name: 'Fartpass 3-2-3x1km',
      filename: '__Fartpass_3-2-3x1km_workout (1).fit',
      description: '3km + 2km + 3x1km i tempo',
      difficulty: 'Hög',
      duration: '65-80 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-3',
      name: 'Fartpass 3xSuper...ar',
      filename: '__Fartpass_3xSuper...ar_workout (1) (1).fit',
      description: '3 x Supersnabba repetitioner',
      difficulty: 'Hög',
      duration: '45-60 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-4',
      name: 'Fartpass 4x3km',
      filename: '__Fartpass_4x3km_workout (1).fit',
      description: '4 x 3km i fartpass-tempo',
      difficulty: 'Hög',
      duration: '80-95 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-5',
      name: 'Fartpass 5-4-3-2-1 km',
      filename: '__Fartpass_5-4-3-2-1_km_workout (1).fit',
      description: 'Pyramid nedåt: 5-4-3-2-1 km',
      difficulty: 'Hög',
      duration: '90-110 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-6',
      name: 'Fartpass 5k tempo',
      filename: '__Fartpass_5k_tempo_workout (1).fit',
      description: '5km i tempofart kontinuerligt',
      difficulty: 'Medel',
      duration: '45-60 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-7',
      name: 'Fartpass 10-8-6-4-2min',
      filename: '__Fartpass_10-8-6-4-2min_workout (1).fit',
      description: 'Nedtrappning: 10-8-6-4-2 minuter',
      difficulty: 'Hög',
      duration: '70-85 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-8',
      name: 'Fartpass 15x200m',
      filename: '__Fartpass_15x200m_workout (2).fit',
      description: '15 x 200m på bana eller väg',
      difficulty: 'Hög',
      duration: '50-65 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-9',
      name: 'Fartpass 15x400m',
      filename: '__Fartpass_15x400m_workout (1).fit',
      description: '15 x 400m repetitioner',
      difficulty: 'Hög',
      duration: '70-85 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-10',
      name: 'Fartpass 30min...ressivt',
      filename: '__Fartpass_30min_...ressivt_workout (1).fit',
      description: '30 min progressivt tempo',
      difficulty: 'Medel',
      duration: '60-75 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-11',
      name: 'Fartpass 45min...ressivt',
      filename: '__Fartpass_45min_...ressivt_workout (1).fit',
      description: '45 min progressivt tempo',
      difficulty: 'Hög',
      duration: '75-90 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-12',
      name: 'Fartpass 3x3km',
      filename: 'Fartpass_3x3km_workout (1).fit',
      description: '3 x 3km i fartpass-tempo',
      difficulty: 'Hög',
      duration: '70-85 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-13',
      name: 'Fartpass 4x2km joggvila',
      filename: 'Fartpass_4x2km_joggvila_workout (1).fit',
      description: '4 x 2km med joggvila',
      difficulty: 'Medel',
      duration: '60-75 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-14',
      name: 'Fartpass 6x1km',
      filename: 'Fartpass_6x1km_workout (1).fit',
      description: '6 x 1km repetitioner',
      difficulty: 'Hög',
      duration: '55-70 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-15',
      name: 'Fartpass 10x400m',
      filename: 'Fartpass_10x400m_workout (1).fit',
      description: '10 x 400m på bana',
      difficulty: 'Hög',
      duration: '50-65 min',
      type: 'Fartpass'
    }
  ],
  langpass: [
    {
      id: 'lang-1',
      name: 'Långpass 90-100min inkl.',
      filename: '__Långpass_90-100...inkl.__workout (1).fit',
      description: 'Långpass 90-100 minuter inklusive uppvärmning',
      difficulty: 'Medel',
      duration: '90-100 min',
      type: 'Långpass'
    }
  ],
  distans: [
    {
      id: 'dist-1',
      name: 'Distans 40-50min strides',
      filename: 'Distans_40-50min-strides_workout (1).fit',
      description: '40-50 min distanslöpning med strides',
      difficulty: 'Låg',
      duration: '40-50 min',
      type: 'Distans'
    }
  ],
  special: [
    {
      id: 'spec-1',
      name: '3 x 2 km jv',
      filename: '3_x_2_km_jv_workout (1).fit',
      description: '3 x 2km med joggvila',
      difficulty: 'Medel',
      duration: '50-65 min',
      type: 'Special'
    },
    {
      id: 'spec-2',
      name: 'Varvetspecial - spuring',
      filename: 'Varvetspecial_-_spu...ing_1_workout (1).fit',
      description: 'Specialpass för Göteborgsvarvet med spurt',
      difficulty: 'Hög',
      duration: '60-75 min',
      type: 'Special'
    }
  ]
};

// Hjälpfunktioner
const getAllWorkouts = () => {
  return Object.values(fitLibrary).flat();
};

const getWorkoutsByCategory = (category) => {
  return fitLibrary[category] || [];
};

const downloadFitFile = async (filename) => {
  try {
    const response = await fetch(`/fit-files/${filename}`);
    if (!response.ok) {
      throw new Error(`Kunde inte ladda ${filename}`);
    }
    const blob = await response.blob();
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Fel vid nedladdning:', error);
    alert('Kunde inte ladda ner filen. Kontrollera att den finns i /public/fit-files/');
  }
};

const GarminFitManager = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [fileType, setFileType] = useState('workout');
  const [expandedCategories, setExpandedCategories] = useState({});
  const fileInputRef = useRef(null);

  const categories = {
    backpass: { name: 'Backpass', color: 'emerald', icon: '⛰️' },
    fartlek: { name: 'Fartlek', color: 'blue', icon: '🔄' },
    fartpass: { name: 'Fartpass', color: 'purple', icon: '⚡' },
    langpass: { name: 'Långpass', color: 'green', icon: '🏃‍♂️' },
    distans: { name: 'Distans', color: 'orange', icon: '📏' },
    special: { name: 'Special', color: 'red', icon: '⭐' }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const fitFiles = files.filter(file => file.name.toLowerCase().endsWith('.fit'));
    
    fitFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          data: e.target.result,
          uploadedAt: new Date().toLocaleString('sv-SE'),
          type: fileType,
          isUploaded: true
        };
        setUploadedFiles(prev => [...prev, fileData]);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const selectLibraryWorkout = (workout) => {
    const isAlreadySelected = selectedFiles.some(f => f.id === workout.id);
    if (isAlreadySelected) {
      setSelectedFiles(prev => prev.filter(f => f.id !== workout.id));
    } else {
      setSelectedFiles(prev => [...prev, { ...workout, selectedAt: new Date().toLocaleString('sv-SE') }]);
    }
  };

  const downloadSelectedFile = async (file) => {
    if (file.isUploaded) {
      // Ladda ner uppladdad fil
      const blob = new Blob([file.data], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // Ladda ner från bibliotek
      await downloadFitFile(file.filename);
    }
  };

  const downloadAllSelected = async () => {
    for (const file of selectedFiles) {
      await downloadFitFile(file.filename);
      // Liten paus mellan nedladdningar
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    for (const file of uploadedFiles) {
      await downloadSelectedFile(file);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const removeFile = (id, isUploaded = false) => {
    if (isUploaded) {
      setUploadedFiles(prev => prev.filter(file => file.id !== id));
    } else {
      setSelectedFiles(prev => prev.filter(file => file.id !== id));
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const allSelectedFiles = [...selectedFiles, ...uploadedFiles];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-stone-50 min-h-screen">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white p-8 rounded-2xl mb-8 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Watch className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">löpning & livet</h1>
            <p className="text-emerald-100 text-lg">FIT File Manager</p>
          </div>
        </div>
        <p className="text-emerald-50 leading-relaxed">
          Anpassa löpning efter livet, inte tvärtom. Välj från ditt träningsbibliotek eller ladda upp egna pass.
        </p>
      </div>

      {/* File Type Selection */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-8 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-stone-800">Typ av FIT-fil</h3>
        <div className="flex gap-6">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="radio"
                name="fileType"
                value="workout"
                checked={fileType === 'workout'}
                onChange={(e) => setFileType(e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                fileType === 'workout' 
                  ? 'border-emerald-600 bg-emerald-600' 
                  : 'border-stone-300 group-hover:border-emerald-400'
              }`}>
                {fileType === 'workout' && (
                  <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
              </div>
            </div>
            <span className="font-medium text-stone-800">Träningspass</span>
            <span className="text-sm text-stone-500 bg-stone-100 px-3 py-1 rounded-full">→ /GARMIN/workouts/</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="radio"
                name="fileType"
                value="activity"
                checked={fileType === 'activity'}
                onChange={(e) => setFileType(e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                fileType === 'activity' 
                  ? 'border-amber-600 bg-amber-600' 
                  : 'border-stone-300 group-hover:border-amber-400'
              }`}>
                {fileType === 'activity' && (
                  <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
              </div>
            </div>
            <span className="font-medium text-stone-800">Aktivitet/Rutt</span>
            <span className="text-sm text-stone-500 bg-stone-100 px-3 py-1 rounded-full">→ /GARMIN/activities/</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Träningsbibliotek */}
        {fileType === 'workout' && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-stone-800 mb-2">Ditt träningsbibliotek</h3>
            <p className="text-stone-600 mb-6">Välj från {getAllWorkouts().length} sparade träningspass:</p>
            
            <div className="space-y-3">
              {Object.entries(categories).map(([categoryKey, category]) => {
                const workouts = getWorkoutsByCategory(categoryKey);
                if (workouts.length === 0) return null;
                
                const isExpanded = expandedCategories[categoryKey];
                
                return (
                  <div key={categoryKey} className="border border-stone-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleCategory(categoryKey)}
                      className="w-full p-4 bg-stone-50 hover:bg-stone-100 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-semibold text-stone-800">{category.name}</span>
                        <span className="bg-stone-200 text-stone-700 text-xs px-2 py-1 rounded-full">
                          {workouts.length}
                        </span>
                      </div>
                      {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>
                    
                    {isExpanded && (
                      <div className="p-2 space-y-2">
                        {workouts.map((workout) => {
                          const isSelected = selectedFiles.some(f => f.id === workout.id);
                          return (
                            <div
                              key={workout.id}
                              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                                isSelected 
                                  ? `border-${category.color}-200 bg-${category.color}-50` 
                                  : 'border-stone-200 hover:border-stone-300 bg-white'
                              }`}
                              onClick={() => selectLibraryWorkout(workout)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium text-stone-800 text-sm">{workout.name}</h4>
                                  <p className="text-xs text-stone-600 mt-1">{workout.description}</p>
                                  <div className="flex gap-2 mt-2">
                                    <span className={`text-xs px-2 py-1 rounded-full bg-${category.color}-100 text-${category.color}-800`}>
                                      {workout.difficulty}
                                    </span>
                                    <span className="text-xs px-2 py-1 rounded-full bg-stone-100 text-stone-600">
                                      {workout.duration}
                                    </span>
                                  </div>
                                </div>
                                {isSelected && (
                                  <CheckCircle className={`w-5 h-5 text-${category.color}-600 ml-2`} />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-stone-800 mb-6">
            Ladda upp egna {fileType === 'workout' ? 'träningspass' : 'aktiviteter'}
          </h3>
          
          <div className="bg-stone-50 border-2 border-dashed border-stone-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors duration-300 mb-6">
            <div className="w-12 h-12 bg-stone-200 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Upload className="w-6 h-6 text-stone-500" />
            </div>
            <p className="text-stone-600 mb-4">Välj dina .fit filer för att importera dem</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".fit"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors duration-200 font-medium shadow-sm"
            >
              Välj FIT-filer
            </button>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-stone-700 mb-3">Uppladdade filer:</h4>
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-medium text-stone-800 text-sm">{file.name}</p>
                      <p className="text-xs text-stone-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file.id, true)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center my-8">
        <h2 className="text-2xl font-bold text-stone-800">
          Valda filer ({allSelectedFiles.length})
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors duration-200 font-medium shadow-sm"
          >
            <Usb className="w-4 h-4" />
            Överföringsinstruktioner
          </button>
          {allSelectedFiles.length > 0 && (
            <button
              onClick={downloadAllSelected}
              className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition-colors duration-200 font-medium shadow-sm"
            >
              <Download className="w-4 h-4" />
              Ladda ner alla ({allSelectedFiles.length})
            </button>
          )}
        </div>
      </div>

      {/* Instructions Panel */}
      {showInstructions && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 mb-8 shadow-sm">
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5" />
            Så här överför du FIT-filer till din Garmin-klocka
          </h3>
          <div className="space-y-6 text-emerald-700">
            <div className="flex items-start gap-4">
              <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
              <div>
                <p className="font-semibold text-lg">Anslut klockan</p>
                <p className="text-emerald-600">Anslut din Garmin-klocka till datorn med USB-kabeln och öppna Garmin Express</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
              <div>
                <p className="font-semibold text-lg">Ladda ner filerna</p>
                <p className="text-emerald-600">Klicka på "Ladda ner alla" eller välj individuella filer från din lista</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</div>
              <div>
                <p className="font-semibold text-lg">Kopiera till rätt mapp</p>
                <p className="text-emerald-600 mb-3">Navigera till klockans enhet och kopiera filerna till:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full font-mono text-emerald-800">Träningspass:</span>
                    <code className="bg-emerald-100 px-3 py-1 rounded-lg text-sm font-mono text-emerald-800">/GARMIN/workouts/</code>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full font-mono text-emerald-800">Aktiviteter:</span>
                    <code className="bg-emerald-100 px-3 py-1 rounded-lg text-sm font-mono text-emerald-800">/GARMIN/activities/</code>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">4</div>
              <div>
                <p className="font-semibold text-lg">Synka och använd</p>
                <p className="text-emerald-600 mb-2">Mata ut klockan säkert, gå in på Garmin Connect och synka med klockan</p>
                <p className="text-sm text-emerald-600 italic bg-emerald-100 px-3 py-2 rounded-lg">
                  💡 För träningspass: Starta aktivitet → Up-menu → Träning → Träningspass → Välj ditt pass
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Files List */}
      {allSelectedFiles.length === 0 ? (
        <div className="text-center py-16 text-stone-500">
          <FileText className="w-20 h-20 mx-auto mb-6 text-stone-300" />
          <p className="text-xl mb-2">Inga filer valda än</p>
          <p className="text-stone-400">
            {fileType === 'workout' 
              ? 'Välj träningspass från biblioteket eller ladda upp egna filer'
              : 'Ladda upp dina aktiviteter/rutter för att komma igång'
            }
          </p>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-stone-800 mb-6">Valda filer att överföra</h3>
          <div className="space-y-3">
            {allSelectedFiles.map((file) => (
              <div key={file.id} className="bg-stone-50 border border-stone-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      file.isUploaded ? 'bg-blue-100' : 'bg-emerald-100'
                    }`}>
                      <FileText className={`w-5 h-5 ${
                        file.isUploaded ? 'text-blue-600' : 'text-emerald-600'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-stone-800">{file.name || file.filename}</h4>
                        {file.type && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            file.isUploaded 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {file.type}
                          </span>
                        )}
                        {file.difficulty && (
                          <span className="text-xs px-2 py-1 rounded-full bg-stone-200 text-stone-700">
                            {file.difficulty}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-stone-600">
                        {file.description || `${file.size ? formatFileSize(file.size) + ' • ' : ''}${file.selectedAt || file.uploadedAt}`}
                      </p>
                      {file.duration && (
                        <p className="text-xs text-stone-500 mt-1">{file.duration}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => downloadSelectedFile(file)}
                      className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Ladda ner
                    </button>
                    <button
                      onClick={() => removeFile(file.id, file.isUploaded)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-stone-200 text-center text-stone-500">
        <p className="text-sm">
          Stöder alla Garmin-klockor som accepterar FIT-filer via USB-anslutning • 
          <span className="font-medium"> {getAllWorkouts().length} träningspass</span> i biblioteket
        </p>
      </div>
    </div>
  );
};

export default GarminFitManager;